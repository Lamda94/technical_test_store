import { IsNumber, IsUUID } from "class-validator";
import { OrderEntity } from "../../domain/entity/order.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreteOrderDto implements OrderEntity{
    @ApiProperty({
        description: 'Id del articulo relacionado a la orden',
        example: 'da89cf90-245e-4e4c-ad87-31fe89d48f38',
        required: true,
    })
    @IsUUID()
    order_article_id: string;
    @ApiProperty({
        description: 'Cantidad del articulo en la orden',
        example: 2,
        required: true,
    })
    @IsNumber({},{message: 'La cantidad debe ser un número'})
    order_amount: number;

    @ApiProperty({
        description: 'Precio del articulo relacionado a la orden',
        example: 10000,
        required: true,
    })
    @IsNumber({},{message: 'El precio debe ser un número'})
    order_article_price: number;

    @ApiProperty({
        description: 'El valor total de la orden debe ser un numero',
        example: 20000,
        required: true,
    })
    order_total: number;
}