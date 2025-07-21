import { ConfigService, registerAs } from '@nestjs/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import { config as dotenvConfig } from 'dotenv';

const env = dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

const configService = new ConfigService({ load: [() => env] });

const IS_LOCAL = configService.get<string>('NODE_ENV') === 'local';

export const database = {
  type: configService.get<string>('DB_TYPE'),
  host: configService.get<string>('HOST_DB'),
  port: configService.get<string>('DB_PORT'),
  database: configService.get<string>('DB_NAME_DEV'),
  username: configService.get<string>('USER_DB'),
  password: configService.get<string>('USER_DB_PASS'),
  entities: ['src/**/*.{model,modelo}{.ts,.js}', '!src/migrate-data/**/*.model{.ts,.js}'],
  migrationsTableName: 'migrations_th',
  migrations: [`src/database/migrations/${configService.get<string>('NODE_ENV')}/*{.ts,.js}`],
  seeds: ['src/**/*.seed.service{.ts,.js}'],
  synchronize: IS_LOCAL ?? false,
  timezone: configService.get<string>('TZ'),
};

export const config = {
  database,
  port: configService.get<string>('PORT_APP'),
  node_env: configService.get<string>('NODE_ENV'),
  secret_key: configService.get<string>('SHARED_SECRET'),
};

export default registerAs('config', () => config);