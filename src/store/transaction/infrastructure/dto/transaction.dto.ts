import { CustomerEntity } from "src/store/customer/domain/entity/customer.entity";
import { OrderEntity } from "src/store/order/domain/entity/order.entity";
import { CreatePayment, TarjetaEntity } from "../../domain/entity/transaction.entity";
import { IsDefined, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateCustomerDto } from "src/store/customer/infrastructure/dtos/customer.dto";
import { CreteOrderDto } from "src/store/order/infrastructure/dto/order.dto";
import { ApiProperty } from "@nestjs/swagger";

class TarjetaDto implements TarjetaEntity{
    @IsDefined()
    @ApiProperty({
        description: 'Titular de la tarjeta',
        example: 'Juan Pérez',
        required: true,
    })
    @IsString({ message: 'El titular de la tarjeta debe ser una cadena de texto' })
    titular: string;

    @IsDefined()
    @ApiProperty({
        description: 'Número de la tarjeta',
        example: 1234567890123456,
        required: true,
    })
    @IsNumber({}, { message: 'El número de la tarjeta debe ser un número' })
    tarjeta_number: number;

    @IsDefined()
    @ApiProperty({
        description: 'Código de verificación de la tarjeta',
        example: 123,
        required: true,
    })
    @IsNumber({}, { message: 'El código de verificación debe ser un número' })
    verify_code: number;

    @IsDefined()
    @ApiProperty({
        description: 'Fecha de expiración de la tarjeta',
        example: '01/24',
        required: true,
    })
    @IsString({ message: 'La fecha de expiración de la tarjeta debe ser una cadena de texto' })
    expired_date: string;
}

export class PaymentDataDto implements CreatePayment{
    @ApiProperty({
        description: 'Datos del cliente',
        required: true,
        type: CreateCustomerDto
    })
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateCustomerDto) 
    customer: CustomerEntity;

    @ApiProperty({
        description: 'Datos de la orden',
        required: true,
        type: CreteOrderDto
    })
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => CreteOrderDto) 
    order: OrderEntity;

    @ApiProperty({
        description: 'Datos de la tarjeta',
        required: true,
        type: TarjetaDto
    })
    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => TarjetaDto) 
    tarjeta: TarjetaEntity;
}