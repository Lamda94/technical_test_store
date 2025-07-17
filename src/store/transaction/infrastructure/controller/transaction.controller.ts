import { Body, Controller, Post } from '@nestjs/common';
import { TransactionCaseUse } from '../../application/transaction.case';
import { TransactionRepository } from '../repository/transaction.repository';
import { OrderRepository } from 'src/store/order/infrastructure/repository/order.repository';
import { ArticleRepository } from 'src/store/articles/infrastructure/repository/article.service';
import { CustomerRepository } from 'src/store/customer/infrastructure/repository/customer.repository';
import { CreatePayment } from '../../domain/entity/transaction.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaymentRepository } from '../repository/payment.repository';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
    private readonly transactionCase: TransactionCaseUse;

    constructor(
        readonly transaction: TransactionRepository,
        readonly order: OrderRepository,
        readonly article: ArticleRepository,
        readonly customer: CustomerRepository,
        readonly payment: PaymentRepository,
    ){
        this.transactionCase = new TransactionCaseUse(transaction, customer, article, order, payment);
    }

    @Post('generate')
    async generateTransaction(@Body() transactionData: CreatePayment){
        return await this.transactionCase.initializePayment(transactionData);
    }
}
