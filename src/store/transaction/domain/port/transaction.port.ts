import { TransactionEntity } from "../entity/transaction.entity";

export interface TransactionPort {
    createTransaction(transaction: TransactionEntity): Promise<TransactionEntity | null>;
    getTransactions(): Promise<TransactionEntity[] | null>;
    getTransactionById(id: string): Promise<TransactionEntity | null>;
    getTransactionsByOrderId(id: string): Promise<TransactionEntity[] | null>;
    updateTransaction(transaction: TransactionEntity, id: string): Promise<void | null>;
    deleteTransaction(id: string): Promise<void | null>;
}