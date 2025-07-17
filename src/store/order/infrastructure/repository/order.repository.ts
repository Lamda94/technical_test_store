import { Injectable } from '@nestjs/common';
import { OrderPort } from '../../domain/port/order.port';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderModel } from '../models/order.model';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/entity/order.entity';

@Injectable()
export class OrderRepository implements OrderPort {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderModel: Repository<OrderModel>,
  ) {}
  async createOrder(orderData: OrderEntity): Promise<OrderEntity | null> {
    try {
      const order = this.orderModel.create(orderData);
      return await this.orderModel.save(order);
    } catch (error) {
      console.log(error.message, ':createOrder');
      return null;
    }
  }

  async getOrders(): Promise<OrderEntity[] | null> {
    try {
      const orders = await this.orderModel.find();
      return orders;
    } catch (error) {
      return null;
    }
  }

  async getOrderById(id: string): Promise<OrderEntity | null> {
    try {
      const order = await this.orderModel.findOneBy({ order_id: id });
      return order;
    } catch (error) {
      return null;
    }
  }

  async getOrdersByClientId(id: string): Promise<OrderEntity[] | null> {
    try {
      const orders = await this.orderModel.find({
        where: { order_customer_id: id },
      });
      return orders;
    } catch (error) {
      return null;
    }
  }
}
