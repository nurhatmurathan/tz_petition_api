import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const ormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
};

const config = ormConfig;

export = config;
