import { CardEntity, ICompanyResponse, ICreateTransactionCard, ITransactionStatusResponse, SaveCardEntity } from "../entity/payment.enity";

export interface PaymentPort {
    saveCard(card: CardEntity):Promise<SaveCardEntity | null>;
    getAcceptanceToken(): Promise<ICompanyResponse | null>;
    createPaymentSources(data: ICreateTransactionCard): Promise<ITransactionStatusResponse | null>;
}