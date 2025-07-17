import { Injectable } from '@nestjs/common';
import { DeliveryPort } from '../../domain/port/delivery.port';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryModel } from '../models/delivery.model';
import { Repository } from 'typeorm';
import { DeliveryEntity } from '../../domain/entity/delivery.entity';

@Injectable()
export class DeliveryRepository implements DeliveryPort {
  constructor(
    @InjectRepository(DeliveryModel)
    private readonly deliveryModel: Repository<DeliveryModel>,
  ) {}
    async getDeliveryByTransactionId(transaction_id: string): Promise<DeliveryEntity | null> {
        try {
            const delivery = await this.deliveryModel.findOne({
                where: { delivery_transaction_id: transaction_id },
            });
            
            return delivery;
        } catch (error) {
            return null;
        }
    }
  async creteDelivery(
    deliveryData: DeliveryEntity,
  ): Promise<DeliveryEntity | null> {
    try {
      const delivery = this.deliveryModel.create(deliveryData);
      await this.deliveryModel.save(delivery);
      return delivery;
    } catch (error) {
      return null;
    }
  }

  async getDeliveryById(id: string): Promise<DeliveryEntity | null> {
    try {
      const deliverys = await this.deliveryModel.findOne({
        where: { delivery_id: id },
      });

      return deliverys;
    } catch (error) {
      return null;
    }
  }

  async getAllDeliveries(): Promise<DeliveryEntity[] | null> {
    try {
      const deliverys = await this.deliveryModel.find();
      return deliverys;
    } catch (error) {
      return null;
    }
  }

  async updateDelivery(
    id: string,
    deliveryData: DeliveryEntity,
  ): Promise<DeliveryEntity | null> {
    try {
      const delivery = await this.deliveryModel.findOne({
        where: { delivery_id: id },
      });

      const updated = { ...delivery, ...deliveryData };

      await this.deliveryModel.save(updated);

      return updated;
    } catch (error) {
      return null;
    }
  }

  async deleteDelivery(id: string): Promise<void> {
    try {
      await this.deliveryModel.delete(id);
    } catch (error) {
      throw new Error('Error al eliminar el delivery');
    }
  }
}
