import { Module } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/repository/article.service';
import { ArticleController } from './infrastructure/controller/article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from './infrastructure/models/article.model';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel]),],
  providers: [ArticleRepository],
  controllers: [ArticleController],
  exports: [ArticleRepository],
})
export class ArticlesModule {}
