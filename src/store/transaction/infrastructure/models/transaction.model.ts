import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionEntity } from "../../domain/entity/transaction.entity";
import { OrderModel } from "src/store/order/infrastructure/models/order.model";

@Entity('transactions')
export class TransactionModel implements TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    transaction_id: string;
    
    @Column({ type: 'uuid', nullable: true })
    transaction_order_id: string;

    @Column({ type: 'varchar', nullable: true, default: 'N.R'})
    transaction_payment_id: string;

    @Column({ type: 'int', nullable: false,  })
    @Generated("increment")
    transaction_number: number;

    @Column({ type: 'float', nullable: false })
    transaction_monto: number;

    @Column({ type: 'date', nullable: false })
    transaction_fecha: string;

    @Column({ type: 'time', nullable: false })
    transaction_hora: string;

    @Column({ type: 'varchar', nullable: false })
    transaction_estado: string;

    @Column({ type: 'varchar', nullable: false })
    transaction_titular: string;

    @Column({ type: 'varchar', nullable: false })
    transaction_tarjeta_number: number;

    @Column({ type: 'int', nullable: false })
    transaction_verify_code: number;

    @Column({ type: 'varchar', nullable: false })
    transaction_expired_date: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: string;

    @ManyToOne(()=> OrderModel, order => order.transactions)
    @JoinColumn({name: 'transaction_order_id'})
    order: OrderModel;
}