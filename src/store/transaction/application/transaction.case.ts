import { ArticlePort } from "src/store/articles/domain/ports/article.port";
import { CustomerPort } from "src/store/customer/domain/port/customer.port";
import { TransactionPort } from "../domain/port/transaction.port";
import { CreatePayment, TransactionEntity } from "../domain/entity/transaction.entity";
import { OrderPort } from "src/store/order/domain/port/order.port";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as moment from 'moment-timezone';
import { PaymentPort } from "../domain/port/payment.port";
import { IAcceptanceUrl, ICreateCharge, ICreateTransactionCard, TransactionStatus } from "../domain/entity/payment.enity";
import { DeliveryCaseUse } from "src/store/delivery/application/delivery.case";
import { DeliveryPort } from "src/store/delivery/domain/port/delivery.port";

export class TransactionCaseUse {
    private readonly deliveryCase: DeliveryCaseUse;
    constructor(
        private readonly transactionPort: TransactionPort,
        private readonly customerPort: CustomerPort,
        private readonly articlePort: ArticlePort,
        private readonly orderPort: OrderPort,
        private readonly paymentPort: PaymentPort,
        readonly deliveryPort: DeliveryPort
    ){
        this.deliveryCase = new DeliveryCaseUse(deliveryPort);
    }

    async initializePayment(paymentData: CreatePayment): Promise<TransactionEntity>{
        try {            
            const ahora = moment().tz('America/Bogota');
            const fecha = ahora.format('YYYY-MM-DD');
            const hora = ahora.format('HH:mm:ss');

            const { customer, order, tarjeta } = paymentData;
            const newCustomer = await this.customerPort.createCustomer(customer);

            if(!newCustomer || !newCustomer.customer_id) throw new HttpException('Error al crear el cliente', HttpStatus.BAD_REQUEST);

            const article = await this.articlePort.articleDetail(order.order_article_id);
            if(!article) throw new HttpException('Error al obtener el artículo', HttpStatus.BAD_REQUEST);

            if(article.article_price !== order.order_article_price) throw new HttpException('El precio del artículo no coincide', HttpStatus.BAD_REQUEST);

            if((order.order_article_price * order.order_amount) !== order.order_total) throw new HttpException('El total de la orden no coincide', HttpStatus.BAD_REQUEST)
                
            order.order_customer_id = newCustomer.customer_id;
            order.order_date = fecha;
            const newOrder = await this.orderPort.createOrder(order);
            if(!newOrder || !newOrder.order_id) throw new HttpException('Error al crear la orden', HttpStatus.BAD_REQUEST);

            const newTransaction: TransactionEntity = {
                transaction_order_id: newOrder.order_id,
                transaction_monto: order.order_total,
                transaction_fecha: fecha,
                transaction_hora: hora,
                transaction_estado: 'PENDIENTE',
                transaction_titular: tarjeta.titular,
                transaction_tarjeta_number: tarjeta.tarjeta_number,
                transaction_verify_code: tarjeta.verify_code,
                transaction_expired_date: tarjeta.expired_date,
            }

            const transaction = await this.transactionPort.createTransaction(newTransaction);
            if(!transaction || !transaction.transaction_id) throw new HttpException('Error al crear la transacción', HttpStatus.BAD_REQUEST);

            await this.goToPay(paymentData, newOrder.order_id, transaction.transaction_id);

            await this.deliveryCase.creteDelivery({
                delivery_addres: paymentData.customer.customer_address,
                delivery_state: 'GENERATED',
                delivery_transaction_id: transaction.transaction_id
            })

            article.article_stock = article.article_stock-paymentData.order.order_amount;
            await this.articlePort.updateArticle(article.article_id!, article);
            
            return transaction;
        } catch (error) {
            console.log(error.message, error.stack, ':initializePayment');
            
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async goToPay(dataPayment: CreatePayment, referencia:string, id_transaction:string): Promise<void>{
        try {
            const dateSplit = dataPayment.tarjeta.expired_date.split('/');
            
            const card = await this.paymentPort.saveCard({
                number: dataPayment.tarjeta.tarjeta_number.toString(),
                card_holder: dataPayment.tarjeta.titular,
                cvc: dataPayment.tarjeta.verify_code.toString(),
                exp_month: dateSplit[0],
                exp_year: dateSplit[1],
            });    

            if(!card) throw new HttpException('Error al guardar la tarjeta', HttpStatus.BAD_REQUEST);

            const tokens = {
                acceptance_token: dataPayment.tokens.acceptance_token,
                personal_data_token: dataPayment.tokens.personal_data_token
            }
            
            const transactionData: ICreateTransactionCard ={
                type: 'CARD',
                token: card.id,
                customer_email: dataPayment.customer.customer_email,
                acceptance_token: tokens.acceptance_token,
                accept_personal_auth: tokens.personal_data_token
            }
            
            const transaction = await this.paymentPort.createPaymentSources(transactionData);
            if(!transaction) throw new HttpException('Error al crear la transacción', HttpStatus.BAD_REQUEST);
            const amountCents = dataPayment.order.order_total * 100;
            const secret = process.env.SECRET_INTEGRITY;
            const dataSignature = `${referencia}${amountCents}COP${secret}`;
            
            const signature = await this.generateSignature(dataSignature);
            
            const creteTransaction: ICreateCharge ={
                amount_in_cents: amountCents,
                currency: 'COP',
                signature: signature,
                customer_email: dataPayment.customer.customer_email,
                payment_method: {
                    installments: 1
                },
                reference: referencia,
                payment_source_id: transaction.data.id
            }
            
            const transactionGenerated = await this.paymentPort.startTransaction(creteTransaction);
            if(!transactionGenerated) throw new HttpException('Error al iniciar la transacción', HttpStatus.BAD_REQUEST);
            
            const internalTransaction =  await this.transactionPort.getTransactionById(id_transaction);
            if(!internalTransaction) throw new HttpException('Error al obtener la transacción', HttpStatus.BAD_REQUEST)

            internalTransaction.transaction_payment_id = transactionGenerated.data.id.toString();
            internalTransaction.transaction_estado = transactionGenerated.data.status;

            await this.transactionPort.updateTransaction(internalTransaction, id_transaction);
             
            await this.ValidateStatusTransaction(id_transaction);
        } catch (error) {
            console.log(error.message, error.stack, ':goToPay');
        }
    }

    async ValidateStatusTransaction(id_transaction:string, intentos:number = 1): Promise<void | TransactionEntity>{
        try {
            const transaction = await this.transactionPort.getTransactionById(id_transaction);
            if(!transaction || !transaction.transaction_payment_id) throw new HttpException('Error al obtener la transacción', HttpStatus.BAD_REQUEST);

            const transactionDetail = await this.paymentPort.getStatusTransaction(transaction.transaction_payment_id);
            if(!transactionDetail) throw new HttpException('Error al obtener el estado de la transacción', HttpStatus.BAD_REQUEST);

            if (transactionDetail.data.status === TransactionStatus.PENDING) {
                if(intentos <= 3){
                    setTimeout(async () => {
                        await this.ValidateStatusTransaction(id_transaction, intentos+1);
                    }, 300000);
                }
            }else{
                transaction.transaction_estado = transactionDetail.data.status;
                await this.transactionPort.updateTransaction(transaction, id_transaction);
            }
            if (intentos ==   1) {
                return transaction;
            }
        } catch (error) {
            console.log(error.message, error.stack, ':getStatusTransaction');
        }
    }

    async getAcceptance(): Promise<IAcceptanceUrl>{
        try {
            const companyData = await this.paymentPort.getAcceptanceToken();
            if (!companyData) throw new HttpException('Error al obtener los tokens', HttpStatus.BAD_REQUEST);
            
            const data:IAcceptanceUrl = {
                presigned_acceptance: {
                    url: companyData?.data.presigned_acceptance.permalink,
                    token: companyData?.data.presigned_acceptance.acceptance_token
                },
                presigned_personal_data_auth: {
                    url: companyData?.data.presigned_personal_data_auth.permalink,
                    token: companyData?.data.presigned_personal_data_auth.acceptance_token
                }
            }
            
            return data;    
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    private async generateSignature(data:string): Promise<string> {      
        const encondedText = new TextEncoder().encode(data);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); 
        return hashHex;
    }
}