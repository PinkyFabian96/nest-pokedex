import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RUTAS_API_V2 } from './api-v2.routes';
import { PokemonModule } from './pokemon/pokemon.module';
@Module({
    imports:[
        PokemonModule,
        RouterModule.register(RUTAS_API_V2)
    ]
})
export class AppRoutingModule {}
