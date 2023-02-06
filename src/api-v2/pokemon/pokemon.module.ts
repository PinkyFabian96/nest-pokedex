import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { DatabaseModule } from '../../database/database.module';
import { modelProviders } from '../../database/model.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [PokemonController],
  providers: [PokemonService, ...modelProviders],
  
})
export class PokemonModule {}
