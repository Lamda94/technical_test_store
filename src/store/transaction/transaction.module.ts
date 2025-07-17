import { Module } from '@nestjs/common';
import { TransactionModel } from './infrastructure/models/transaction.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './infrastructure/controller/transaction.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionModel])],
    controllers: [TransactionController],
})
export class TransactionModule {}
