export interface ArticleEntity {
  article_id?: string;
  article_name: string;
  article_description: string;
  article_price: number;
  article_image: string;
  article_stock: number;
  article_status: number;
  cretated_at?: Date;
  updated_at?: Date;
}