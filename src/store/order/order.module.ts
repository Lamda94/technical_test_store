import { Module } from '@nestjs/common';
import { OrderModel } from './infrastructure/models/order.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './infrastructure/repository/order.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderModel])],
    providers: [OrderRepository],
    exports: [OrderRepository]
})
export class OrderModule {}
