import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ArticlesModule],
  providers: []
})
export class StoreModule {}
