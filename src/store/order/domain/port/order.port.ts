import { OrderEntity } from "../entity/order.entity";

export interface OrderPort {
    createOrder(order: OrderEntity): Promise<OrderEntity | null>;
    getOrders(): Promise<OrderEntity[] | null>;
    getOrderById(id: string): Promise<OrderEntity | null>;
    getOrdersByClientId(id: string): Promise<OrderEntity[] | null>;
}