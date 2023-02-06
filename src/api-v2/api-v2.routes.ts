import { PokemonModule } from './pokemon/pokemon.module';

export const RUTAS_API_V2 = [
    {
        path:'api/v2',
        children:[
            {
                path:'pokemon',
                module:PokemonModule
            }
        ]
    }
]