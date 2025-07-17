import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerCaseUse } from '../../application/customer.case';
import { CustomerRepository } from '../repository/customer.repository';
import { CreateCustomerDto } from '../dtos/customer.dto';

@Controller('customer')
export class CustomerController {
    private readonly customerCase: CustomerCaseUse;
    constructor(readonly customerRepository: CustomerRepository){
        this.customerCase = new CustomerCaseUse(customerRepository);
    }

    @Post('create')
    async createCustomer(@Body() customerData: CreateCustomerDto){
        return await this.customerCase.creteCustomer(customerData);
    }

    @Get('detail')
    async getDetailCustomer(@Query('customer_id') id_customer: string){
        return await this.customerCase.getCustomerDetail(id_customer);
    }
}
