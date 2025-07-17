import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ArticlesModule, CustomerModule],
  providers: []
})
export class StoreModule {}
