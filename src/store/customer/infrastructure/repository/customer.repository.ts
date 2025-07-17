import { Injectable } from '@nestjs/common';
import { CustomerPort } from '../../domain/port/customer.port';
import { CustomerEntity } from '../../domain/entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerModel } from '../models/customer.model';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository implements CustomerPort {
  constructor(
    @InjectRepository(CustomerModel)
    private readonly customerModel: Repository<CustomerModel>,
  ) {}
  
  async getCustomerById(id: string): Promise<CustomerEntity | null> {
    try {
      const customer = await this.customerModel.findOne({ where: { customer_id: id } });
      return customer || null;
    } catch (error) {
      return null;
    }
  }

  async getAllCustomers(): Promise<CustomerEntity[] | null> {
    try {
      const customers = await this.customerModel.find();
      return customers ?? null;
    } catch (error) {
      return null;
    }
  }

  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null> {
   try {
      const newCustomer = this.customerModel.create(customer);
      const savedCustomer = await this.customerModel.save(newCustomer);
      return savedCustomer; 
   } catch (error) {
      return null;
   }
  }
  
  async updateCustomer(
    id: string,
    customer: CustomerEntity,
  ): Promise<CustomerEntity | null> {
    try {
      const existingCustomer = await this.customerModel.findOne({ where: { customer_id: id } });
      if (!existingCustomer) {
        return null;
      }
      const updatedCustomer = Object.assign(existingCustomer, customer);
      const savedCustomer = await this.customerModel.save(updatedCustomer);
      return savedCustomer;
    } catch (error) {
      return null;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      const result = await this.customerModel.delete({ customer_id: id });
      if (result.affected === 0) {
        throw new Error('Customer not found');
      }
    } catch (error) {
      throw new Error('Error deleting customer');
    }
  }
}
