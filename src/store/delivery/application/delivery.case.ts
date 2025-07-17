import { HttpException, HttpStatus } from '@nestjs/common';
import { DeliveryEntity } from '../domain/entity/delivery.entity';
import { DeliveryPort } from '../domain/port/delivery.port';

export class DeliveryCaseUse {
  constructor(private readonly deliveryRepository: DeliveryPort) {}

  async creteDelivery(
    delivery: DeliveryEntity,
  ): Promise<DeliveryEntity | null> {
    try {
      const deliveryExists =
        await this.deliveryRepository.getDeliveryByTransactionId(
          delivery.delivery_transaction_id,
        );
      if (deliveryExists) {
        throw new HttpException(
          'El delivery ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.deliveryRepository.creteDelivery(delivery);
    } catch (error) {
      throw new HttpException(
        'Error al crear el delivery',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async detailDeliveryByTransaction(id: string): Promise<DeliveryEntity | null> {
    try {
      const deliveryExists = await this.deliveryRepository.getDeliveryByTransactionId(id);
      if (!deliveryExists) {
        throw new HttpException('El delivery no existe', HttpStatus.NOT_FOUND);
      }
      return deliveryExists;
    } catch (error) {
      throw new HttpException(
        'Error al obtener el delivery',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllDeliveries(): Promise<DeliveryEntity[] | null> {
    try {
      const deliveryList = await this.deliveryRepository.getAllDeliveries();
      if (!deliveryList || deliveryList.length === 0) {
        throw new HttpException(
          'No se encontraron deliveries',
          HttpStatus.NOT_FOUND,
        );
      }
      return deliveryList;
    } catch (error) {
      throw new HttpException(
        'Error al obtener los deliveries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateDelivery(
    id: string,
    delivery: DeliveryEntity,
  ): Promise<DeliveryEntity | null> {
    try {
      const deliveryExists = await this.deliveryRepository.getDeliveryById(id);
      if (!deliveryExists) {
        throw new HttpException('El delivery no existe', HttpStatus.NOT_FOUND);
      }
      return await this.deliveryRepository.updateDelivery(id, delivery);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el delivery',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteDelivery(id: string): Promise<void> {
    try {
      const deliveryExists = await this.deliveryRepository.getDeliveryById(id);
      if (!deliveryExists) {
        throw new HttpException('El delivery no existe', HttpStatus.NOT_FOUND);
      }

      return await this.deliveryRepository.deleteDelivery(id);
    } catch (error) {}
  }
}
