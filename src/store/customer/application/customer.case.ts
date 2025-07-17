import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomerEntity } from '../domain/entity/customer.entity';
import { CustomerPort } from '../domain/port/customer.port';

export class CustomerCaseUse {
  constructor(private readonly customerPort: CustomerPort) {}

  async creteCustomer(customerData: CustomerEntity): Promise<CustomerEntity> {
    try {
        const newCustomer = await this.customerPort.createCustomer(customerData);
        if(!newCustomer) throw new HttpException('Error registarndo al cliente', HttpStatus.BAD_REQUEST);

        return newCustomer;
    } catch (error) {
      console.log(error.message);
    
      throw new HttpException(
        'Error registarndo al cliente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async getCustomerDetail(customer_id:string): Promise<CustomerEntity> {
    try {
        const customer = await this.customerPort.getCustomerById(customer_id);
        if(!customer) throw new HttpException('Datos del cliente no encontrados', HttpStatus.NOT_FOUND);

        return customer;
    } catch (error) {
        console.log(error.message);
        
        throw new HttpException("Error obteniendo el datalle del cliente", HttpStatus.BAD_REQUEST);
    }
  }
}
