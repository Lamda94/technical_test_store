import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "../../domain/entity/article.entity";

@Entity({ name: 'articles' })
export class ArticleModel implements ArticleEntity{
    @PrimaryGeneratedColumn('uuid')
    article_id: string;

    @Column({ type: 'varchar', nullable: false })
    article_name: string;

    @Column({ type: 'varchar', nullable: false })
    article_description: string;

    @Column({ type: 'float', nullable: false })
    article_price: number;

    @Column({ type: 'varchar', nullable: false })
    article_image: string;

    @Column({ type: 'int', nullable: false })
    article_stock: number;

    @Column({ type: 'int', nullable: false })
    article_status: number;
}