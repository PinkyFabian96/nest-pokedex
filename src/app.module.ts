import { join } from 'path'; // en node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppRoutingModule } from './api-v2/app-routing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','public'),
    }),
    //MongooseModule.forRoot('mongodb://localhost'),
    DatabaseModule,
    AppRoutingModule,
    CommonModule
  ],
})
export class AppModule {}
