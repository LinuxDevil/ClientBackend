import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',
            host: process.env.DATABAE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: 'postgres', 
            password: 'conquer001', // make it postgres
            database: process.env.DATABASE_DB,
            synchronize: true,
            dropSchema: false,
            logging: true,
            entities: ['dist/**/*.entity.js']
        };
    }
}