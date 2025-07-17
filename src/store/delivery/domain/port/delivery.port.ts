import { DeliveryEntity } from "../../domain/entity/delivery.entity";

export interface DeliveryPort{
    creteDelivery(delivery:DeliveryEntity): Promise<DeliveryEntity | null>
    getDeliveryById(id:string): Promise<DeliveryEntity | null>
    getDeliveryByTransactionId(transaction_id:string): Promise<DeliveryEntity | null>
    getAllDeliveries(): Promise<DeliveryEntity[] | null>
    updateDelivery(id:string, delivery:DeliveryEntity): Promise<DeliveryEntity | null>
    deleteDelivery(id:string): Promise<void>
}
