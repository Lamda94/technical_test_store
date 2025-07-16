import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
