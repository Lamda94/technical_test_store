import { Module } from '@nestjs/common';
import { TransactionModel } from './infrastructure/models/transaction.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './infrastructure/controller/transaction.controller';
import { OrderModule } from '../order/order.module';
import { CustomerModule } from '../customer/customer.module';
import { ArticlesModule } from '../articles/articles.module';
import { TransactionRepository } from './infrastructure/repository/transaction.repository';
import { PaymentRepository } from './infrastructure/repository/payment.repository';

@Module({
    imports: [OrderModule, CustomerModule, ArticlesModule, TypeOrmModule.forFeature([TransactionModel])],
    controllers: [TransactionController],
    providers: [TransactionRepository, PaymentRepository],
    exports: [TransactionRepository],
})
export class TransactionModule {}
