import { Connection } from "mongoose";
import { PokemonSchema, Pokemon } from '../api-v2/pokemon/entities/pokemon.entity';

export const modelProviders = [
    {
        provide: 'PokemonModel',
        useFactory: async (connection: Connection) =>  connection.model(Pokemon.name, PokemonSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]