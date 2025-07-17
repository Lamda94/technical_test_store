import { CustomerEntity } from '../entity/customer.entity';

export interface CustomerPort {
  getCustomerById(id: string): Promise<CustomerEntity | null>;
  getAllCustomers(): Promise<CustomerEntity[] | null>;
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null>;
  updateCustomer(id: string, customer: CustomerEntity): Promise<CustomerEntity | null>;
  deleteCustomer(id: string): Promise<void>;
}
