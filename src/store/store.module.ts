import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ArticlesModule, CustomerModule, DeliveryModule, TransactionModule, OrderModule],
  providers: [],
  controllers: []
})
export class StoreModule {}
