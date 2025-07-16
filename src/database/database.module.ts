// importacion de modulos necesarios para la configuración de la conexion a la base de datos
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, type ConfigType } from '@nestjs/config';
import config from 'src/config';



@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          type: configService.database.type,
          host: configService.database.host,
          port: configService.database.port,
          username: configService.database.username,
          password: configService.database.password,
          database: configService.database.database,
          autoLoadEntities: true,
          synchronize: configService.database.synchronize,
          useSanitizeQuery: true,
          timezone: configService.database.timezone,
          /*logging: true,
          logger: "advanced-console"*/
        } as TypeOrmModuleOptions;
      },
    }),
  ],
  exports: [ConfigModule, TypeOrmModule],
})
export class DatabaseModule {}
