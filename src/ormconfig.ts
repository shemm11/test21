import { TypeOrmModule } from '@nestjs/typeorm';

const config: TypeOrmModule = {
  type: 'sqlite',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'pa44word',
      database: 'bcc',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrationsTableName: "test",

};

export default config;
