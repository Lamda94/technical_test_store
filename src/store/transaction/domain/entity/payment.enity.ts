export interface CardEntity {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  card_holder: string;
}

export interface SaveCardEntity {
  id: string;
  created_at: string;
  brand: string;
  name: string;
  last_four: string;
  bin: string;
  exp_year: string;
  exp_month: string;
  card_holder: string;
  expires_at: string;
}

export interface ICompanyResponse {
  data: ICompany;
  meta: Record<string, unknown>;
}

export interface ICompany {
  id: number;
  name: string;
  email: string;
  contact_name: string;
  phone_number: string;
  active: boolean;
  logo_url: string | null;
  legal_name: string;
  legal_id_type: string;
  legal_id: string;
  public_key: string;
  accepted_currencies: string[];
  fraud_javascript_key: string | null;
  fraud_groups: string[];
  accepted_payment_methods: string[];
  payment_methods: IPaymentMethod[];
  presigned_acceptance: IPresignedDocument;
  presigned_personal_data_auth: IPresignedDocument;
  click_to_pay_dpa_id: string | null;
  mcc: string | null;
  acquirer_id: string | null;
}

export interface IPaymentMethod {
  name: string;
  payment_processors: IPaymentProcessor[];
}

export interface IPaymentProcessor {
  name: string;
}

export interface IPresignedDocument {
  acceptance_token: string;
  permalink: string;
  type: string;
}

export interface ICreateTransactionCard {
  type: string;
  token: string;
  customer_email: string;
  acceptance_token: string;
  accept_personal_auth: string;
}

export interface ITransactionStatusResponse {
  data: {
    id: number;
    public_data: {
      type: string;
    };
    type: string;
    status: string;
  };
}

export interface ICreateCharge {
  amount_in_cents: number;
  currency: string;
  signature: string;
  customer_email: string;
  payment_method?: {
    installments: number;
  };
  reference: string;
  payment_source_id: number;
}


