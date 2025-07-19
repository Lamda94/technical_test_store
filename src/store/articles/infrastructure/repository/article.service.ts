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

  async creteArticle(article: ArticleEntity): Promise<ArticleEntity | null> {
    try {
      const newArticle = this.articleModel.create(article);
      const savedArticle = await this.articleModel.save(newArticle);
      return savedArticle;
    } catch (error) {
      return null;
    }
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

  async articleDetail(id: string): Promise<ArticleEntity | null> {
    try {
      const article = await this.articleModel.findOneBy({ article_id: id });
      return article;
    } catch (error) {
      return null;
    }
  }

  async updateArticle(id: string, article: ArticleEntity): Promise<ArticleEntity | null> {
    try {
      const articleOld = await this.articleModel.findOne({ where: { article_id: id }});
      const newArticle = {...articleOld, ...article}

      return await this.articleModel.save(newArticle);
    } catch (error) {
      console.log(error.message, "Error al actualizar el articulo")

      return null;
    }
  }
}
