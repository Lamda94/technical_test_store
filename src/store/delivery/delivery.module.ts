import { Module } from '@nestjs/common';
import { DeliveryController } from './infrastructure/controller/delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryModel } from './infrastructure/models/delivery.model';
import { DeliveryRepository } from './infrastructure/repository/delivery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryModel])],
  controllers: [DeliveryController],
  providers: [DeliveryRepository],
  exports: [DeliveryRepository]
})
export class DeliveryModule {}
