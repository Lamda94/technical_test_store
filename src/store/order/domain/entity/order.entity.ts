export interface OrderEntity {
    order_id?: string;
    order_customer_id?: string;
    order_article_id: string;
    order_amount: number;
    order_article_price: number;
    order_total: number;
    order_date?: string;
}