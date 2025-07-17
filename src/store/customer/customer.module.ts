import { Module } from '@nestjs/common';
import { CustomerController } from './infraestructure/controller/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './infraestructure/models/customer.model';
import { CustomerRepository } from './infraestructure/repository/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [CustomerRepository],
})
export class CustomerModule {}
