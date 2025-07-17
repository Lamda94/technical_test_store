import { Controller, Get, Query } from '@nestjs/common';
import { DeliveryCaseUse } from '../../application/delivery.case';
import { DeliveryRepository } from '../repository/delivery.repository';

@Controller('delivery')
export class DeliveryController {
    private readonly deliveryCase: DeliveryCaseUse;
    constructor(readonly deliveryRepository: DeliveryRepository){
        this.deliveryCase = new DeliveryCaseUse(this.deliveryRepository);
    }

    @Get('detail')
    async detailDeliveryByTransaction(@Query('id_trans') id: string){
        return await this.deliveryCase.detailDeliveryByTransaction(id)
    }
}
