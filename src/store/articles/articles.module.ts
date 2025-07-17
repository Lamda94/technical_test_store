import { Module } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/repository/article.service';
import { ArticleController } from './infrastructure/controller/article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from './infrastructure/models/article.model';
import { ArticleSeeder } from './infrastructure/seeder/article.seed';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel]),],
  providers: [ArticleRepository, ArticleSeeder],
  controllers: [ArticleController],
  exports: [ArticleRepository],
})
export class ArticlesModule {
  constructor(private readonly seedService: ArticleSeeder) {}

  async onModuleInit(): Promise<void> {
    await this.seedService.run();
  }
}
