import { IsNotEmpty, IsString } from 'class-validator';
import { CustomerEntity } from '../../domain/entity/customer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto implements CustomerEntity {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan',
    required: true,
  })
  @IsString({ message: 'El nombre del cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacío' })
  customer_first_name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Pérez',
    required: true,
  })
  @IsString({ message: 'El apellido del cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido del cliente no puede estar vacío' })
  customer_last_name: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'correo@ejemplo.com',
    required: true,
  })
  @IsString({
    message: 'El correo electrónico del cliente debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El correo electrónico del cliente no puede estar vacío',
  })
  customer_email: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '123456789',
    required: true,
  })
  @IsString({
    message: 'El número de teléfono del cliente debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El número de teléfono del cliente no puede estar vacío',
  })
  customer_phone_number: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: 'Calle Falsa 123',
    required: true,
  })
  @IsString({
    message: 'La dirección del cliente debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La dirección del cliente no puede estar vacía' })
  customer_address: string;
}
