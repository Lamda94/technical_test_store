import { Module } from '@nestjs/common';
import { OrderModel } from './infrastructure/models/order.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([OrderModel])],
})
export class OrderModule {}
