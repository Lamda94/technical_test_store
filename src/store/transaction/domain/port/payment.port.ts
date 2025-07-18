import {
  CardEntity,
  ICompanyResponse,
  ICreateCharge,
  ICreateTransactionCard,
  ITransactionDetail,
  ITransactionResponse,
  ITransactionStatusResponse,
  SaveCardEntity,
} from '../entity/payment.enity';

export interface PaymentPort {
  saveCard(card: CardEntity): Promise<SaveCardEntity | null>;
  getAcceptanceToken(): Promise<ICompanyResponse | null>;
  createPaymentSources(
    data: ICreateTransactionCard,
  ): Promise<ITransactionStatusResponse | null>;
  startTransaction(
    payload: ICreateCharge,
  ): Promise<ITransactionResponse | null>;
  getStatusTransaction(id: string): Promise<ITransactionDetail | null>;
}
