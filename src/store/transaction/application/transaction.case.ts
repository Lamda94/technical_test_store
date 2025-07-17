import { ArticlePort } from "src/store/articles/domain/ports/article.port";
import { CustomerPort } from "src/store/customer/domain/port/customer.port";
import { TransactionPort } from "../domain/port/transaction.port";
import { CreatePayment, TransactionEntity } from "../domain/entity/transaction.entity";
import { OrderPort } from "src/store/order/domain/port/order.port";
import { HttpException, HttpStatus } from "@nestjs/common";
import moment from "moment-timezone";

export class TransactionCaseUse {
    constructor(
        private readonly transactionPort: TransactionPort,
        private readonly customerPort: CustomerPort,
        private readonly articlePort: ArticlePort,
        private readonly orderPort: OrderPort,
    ){}

    async initializePayment(paymentData: CreatePayment): Promise<TransactionEntity>{
        try {
            const ahora = moment().tz('America/Bogota');
            const fecha = ahora.format('YYYY-MM-DD');
            const hora = ahora.format('HH:mm:ss');

            const { customer, order, tarjeta } = paymentData;
            const newCustomer = await this.customerPort.createCustomer(customer);

            if(!newCustomer || !newCustomer.customer_id) throw new HttpException('Error al crear el cliente', HttpStatus.BAD_REQUEST);

            order.order_customer_id = newCustomer.customer_id;
            const newOrder = await this.orderPort.createOrder(order);
            if(!newOrder || !newOrder.order_id) throw new HttpException('Error al crear la orden', HttpStatus.BAD_REQUEST);

            const newTransaction: TransactionEntity = {
                transaction_order_id: order.order_id,
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

            return transaction;
        } catch (error) {
            console.log(error.message, error.stack, ':initializePayment');
            
            throw new HttpException('Error al inicializar el pago', HttpStatus.BAD_REQUEST);
        }
    }
}