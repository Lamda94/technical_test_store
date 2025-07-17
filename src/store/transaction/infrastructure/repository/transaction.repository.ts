import { Injectable } from '@nestjs/common';
import { TransactionPort } from '../../domain/port/transaction.port';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionModel } from '../models/transaction.model';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../domain/entity/transaction.entity';

@Injectable()
export class TransactionRepository implements TransactionPort {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly transactionModel: Repository<TransactionModel>,
  ) {}
  async createTransaction(
    transaction: TransactionEntity,
  ): Promise<TransactionEntity | null> {
    try {
      const newTransaction = this.transactionModel.create(transaction);
      await this.transactionModel.save(newTransaction);
      return newTransaction;
    } catch (error) {
      console.log(error.message, error.stack, ':createTransaction');
      
      return null;
    }
  }

  async getTransactions(): Promise<TransactionEntity[] | null> {
    try {
      const transactions = await this.transactionModel.find();
      return transactions;
    } catch (error) {
      return null;
    }
  }

  async getTransactionById(id: string): Promise<TransactionEntity | null> {
    try {
      const transaction = await this.transactionModel.findOne({
        where: { transaction_id: id },
      });
      return transaction;
    } catch (error) {
      return null;
    }
  }

  async getTransactionsByOrderId(
    id: string,
  ): Promise<TransactionEntity[] | null> {
    try {
      const transactions = await this.transactionModel.find({
        where: { transaction_order_id: id },
      });
      return transactions;
    } catch (error) {
      return null;
    }
  }

  async updateTransaction(
    transaction: TransactionEntity,
    id: string,
  ): Promise<void | null> {
    try {
      await this.transactionModel.update(id, transaction);
    } catch (error) {
      return null;
    }
  }

  async deleteTransaction(id: string): Promise<void | null> {
    try {
      await this.transactionModel.delete(id);
    } catch (error) {
      return null;
    }
  }
}
