import { Injectable } from '@nestjs/common';
import { PaymentPort } from '../../domain/port/payment.port';
import {
  CardEntity,
  ICompanyResponse,
  ICreateTransactionCard,
  ITransactionStatusResponse,
  SaveCardEntity,
} from '../../domain/entity/payment.enity';
import axios from 'axios';

@Injectable()
export class PaymentRepository implements PaymentPort {
  async createPaymentSources(
    data: ICreateTransactionCard,
  ): Promise<ITransactionStatusResponse | null> {
    try {
      const url = process.env.BASE_URL_PAYMENT;
      const privateKey = process.env.PRIVATE_KEY;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url}/payment_sources`,
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `Bearer ${privateKey}`,
        },
        data,
      };

      const response = await axios.request(config);
      const json_response = response.data;

      return json_response;
    } catch (error) {
      console.log(error.message, error.stack, ':createPaymentSources');

      return null;
    }
  }
  async getAcceptanceToken(): Promise<ICompanyResponse | null> {
    try {
      const url = process.env.BASE_URL_PAYMENT;
      const publicKey = process.env.PUBLIC_KEY;

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url}/merchants/${publicKey}`,
        headers: {
          'Content-Type': 'application/xml',
        },
      };

      const response = await axios.request(config);
      const json_response = response.data;

      return json_response;
    } catch (error) {
      console.log(error.message, error.stack, ':getAcceptanceToken');

      return null;
    }
  }

  async saveCard(card: CardEntity): Promise<SaveCardEntity | null> {
    try {
      const url = process.env.BASE_URL_PAYMENT;
      const publicKey = process.env.PUBLIC_KEY;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${url}/tokens/cards`,
        headers: {
          'Content-Type': 'application/xml',
          Authorization: `Bearer ${publicKey}`,
        },
        data: card,
      };

      const response = await axios.request(config);
      const json_response = response.data;

      return json_response.data;
    } catch (error) {
      console.log(error.message, error.stack, ':saveCard');

      return null;
    }
  }
}
