import { Module } from '@nestjs/common';
import { CustomerController } from './infrastructure/controller/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './infrastructure/models/customer.model';
import { CustomerRepository } from './infrastructure/repository/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [CustomerRepository],
})
export class CustomerModule {}
