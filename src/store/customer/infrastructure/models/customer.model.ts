import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerEntity } from "../../domain/entity/customer.entity";
import { OrderModel } from "src/store/order/infrastructure/models/order.model";

@Entity("customer")
export class CustomerModel implements CustomerEntity {
    @PrimaryGeneratedColumn("uuid")
    customer_id: string;

    @Column({ type: 'varchar', nullable: false})
    customer_first_name: string;

    @Column({ type: 'varchar', nullable: false})
    customer_last_name: string;

    @Column({ type: 'varchar', nullable: false})
    customer_email: string;

    @Column({ type: 'varchar', nullable: false})
    customer_phone_number: string;

    @Column({ type: 'varchar', nullable: false})
    customer_address: string;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => OrderModel, (order) => order.customer)
    order: OrderModel;
}