import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../../domain/entity/order.entity";
import { CustomerModel } from "src/store/customer/infrastructure/models/customer.model";
import { TransactionModel } from "src/store/transaction/infrastructure/models/transaction.model";
import { ArticleModel } from "src/store/articles/infrastructure/models/article.model";

@Entity('orders')
export class OrderModel implements OrderEntity{
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column({ type: 'uuid', nullable: false })
    order_customer_id: string;

    @Column({ type: 'uuid', nullable: false })
    order_article_id: string;

    @Column({ type: 'int', nullable: false })
    order_amount: number;

    @Column({ type: 'int', nullable: false })
    order_article_price: number;

    @Column({ type: 'int', nullable: false })
    order_total: number;

    @Column({ type: 'date', nullable: false })
    order_date: string;

    @OneToMany(() => TransactionModel, (transaction) => transaction.order)
    transactions: TransactionModel;

    @ManyToOne(()=> CustomerModel, customer => customer.order)
    @JoinColumn({name: 'order_customer_id'})
    customer: CustomerModel;

    @ManyToOne(()=> ArticleModel, article => article.order)
    @JoinColumn({name: 'order_article_id'})
    article: ArticleModel;
}