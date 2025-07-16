import { Injectable } from '@nestjs/common';
import { ArticlePort } from '../../domain/ports/article.port';
import { ArticleEntity } from '../../domain/entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleModel } from '../models/article.model';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleRepository implements ArticlePort {
  constructor(
    @InjectRepository(ArticleModel)
    private readonly articleModel: Repository<ArticleModel>,
  ) {}

  creteArticle(article: ArticleEntity): Promise<ArticleEntity> {
    throw new Error('Method not implemented.');
  }

  async getArticles(): Promise<ArticleEntity[] | null> {
    try {
      const articles = await this.articleModel.find({
        where: { article_status: 1 },
      });
      return articles;
    } catch (error) {
      return null;
    }
  }

  searchArticle(query: string): Promise<ArticleEntity[]> {
    throw new Error('Method not implemented.');
  }
  async articleDetail(id: string): Promise<ArticleEntity | null> {
    try {
      const article = await this.articleModel.findOneBy({ article_id: id });
      return article;
    } catch (error) {
      return null;
    }
  }
  updateArticle(id: string, article: ArticleEntity): Promise<ArticleEntity> {
    throw new Error('Method not implemented.');
  }
  deleteArticle(id: string): Promise<ArticleEntity> {
    throw new Error('Method not implemented.');
  }
}
