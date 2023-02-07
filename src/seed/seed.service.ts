import { PokeResponse } from './interfaces/poke-response.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  private readonly POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=2";
  constructor(private _httpService:HttpService){}

  async executeSeed() {
    const data = await firstValueFrom( this._httpService.get<PokeResponse>(this.POKEMON_URL).pipe(
      map( res => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.response.data);
        throw 'An error happened!';
      }),
      )
    )

    data.results.forEach( ({name, url}) => {
      //console.log({ name, url });
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];

      console.log({ name, no });
    })

    return data.results;
  }
}
