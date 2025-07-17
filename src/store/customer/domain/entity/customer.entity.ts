export interface CustomerEntity {
    customer_id?: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_email: string;
    customer_phone_number: string;
    customer_address: string;
    created_at?: Date;
    updated_at?: Date;
}