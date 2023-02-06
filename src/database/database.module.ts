import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from 'src/api-v2/pokemon/entities/pokemon.entity';
import { modelProviders } from './model.provider';

@Module({
    providers: [...databaseProviders, ...modelProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
