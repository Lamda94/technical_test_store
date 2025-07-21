import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionCaseUse } from '../../application/transaction.case';
import { TransactionRepository } from '../repository/transaction.repository';
import { OrderRepository } from 'src/store/order/infrastructure/repository/order.repository';
import { ArticleRepository } from 'src/store/articles/infrastructure/repository/article.service';
import { CustomerRepository } from 'src/store/customer/infrastructure/repository/customer.repository';
import { ApiTags } from '@nestjs/swagger';
import { PaymentRepository } from '../repository/payment.repository';
import { DeliveryRepository } from 'src/store/delivery/infrastructure/repository/delivery.repository';
import { PaymentDataDto } from '../dto/transaction.dto';

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
        readonly delivery: DeliveryRepository,
    ){
        this.transactionCase = new TransactionCaseUse(transaction, customer, article, order, payment, delivery);
    }

    @Post('generate')
    async generateTransaction(@Body() transactionData: PaymentDataDto){
        return await this.transactionCase.initializePayment(transactionData);
    }

    @Get('status')
    async validateStatusTransaction(@Query('id') id:string){
        return await this.transactionCase.ValidateStatusTransaction(id);
    }

    //@UseGuards(HmacGuard)
    @Get('acceptance/links')
    async getAcceptance(){
        return await this.transactionCase.getAcceptance();
    }
}
