import { CustomerEntity } from "src/store/customer/domain/entity/customer.entity";
import { OrderEntity } from "src/store/order/domain/entity/order.entity";

export interface TransactionEntity {
    transaction_id?: string;
    transaction_order_id?: string;
    transaction_number?: number;
    transaction_monto: number;
    transaction_fecha: string;
    transaction_hora: string;
    transaction_estado: string;
    transaction_titular: string;
    transaction_tarjeta_number: number;
    transaction_verify_code: number;
    transaction_expired_date: string;
    create_at?: string;
    update_at?: string;
}

export interface CreatePayment {
    customer: CustomerEntity;
    order: OrderEntity;
    tarjeta: {
        titular: string;
        tarjeta_number: number;
        verify_code: number;
        expired_date: string;
    }
}

