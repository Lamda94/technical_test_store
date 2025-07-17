import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryEntity } from "../../domain/entity/delivery.entity";

@Entity('delivery')
export class DeliveryModel implements DeliveryEntity{
    @PrimaryGeneratedColumn("uuid")
    delivery_id: string;

    @Column({type: "varchar", unique: true, nullable: false})
    delivery_transaction_id: string;

    @Column({type: "varchar", nullable: false})
    delivery_addres: string;

    @Column({type: "varchar", nullable: false})
    delivery_state: string;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    cretated_at: string;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: string;
}