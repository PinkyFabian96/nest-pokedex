import { BadGatewayException, Inject, Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    //@Inject('')
    private readonly pokemonModel: Model<Pokemon>,
    ) {

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
  
      return pokemon;
      
    } catch (error) {
      // if( error.code === 11000){
      //   throw new BadGatewayException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`)
      // }
      // console.log(error)
      // throw new InternalServerErrorException(" can-'t create Pokemon - Check server logs");
      this.handleExceptions( error );
    }

  }

  async findAll() {
    //return `This action returns all pokemon`;
    return await this.pokemonModel.find();
  }

  async findOne(term: string):Promise<Pokemon> {
    let pokemon:Pokemon;

    if(! isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne( { no:term } );
    }

    // Mongo ID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne( { name: term} );
    }

    if ( !pokemon ){
      throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found `);
    }

    return pokemon;


    //return `This action returns a #${id} pokemon`;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
  
    const pokemon = await this.findOne( term );

    try {

      if ( updatePokemonDto.name ) {
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      }

      const pokemonUpdate = await pokemon.updateOne( updatePokemonDto, { 
        //returnOriginal:false, 
        returnDocument:'after' });

    } catch (error) {
      this.handleExceptions( error );
    }
      
      return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  async remove(id: string) {
    // //const pokemon = await this.findOne( id );
    // //await pokemon.deleteOne();

    //const result = this.pokemonModel.findByIdAndDelete( id );

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id:id });
    if( deletedCount === 0) 
      throw new BadRequestException( ` Pokemon with id "${ id } not found"`);


    return;
    
  }

  private handleExceptions ( error: any ){
    if ( error.code === 11000) 
      throw new BadGatewayException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`);
    else
      throw new InternalServerErrorException(" can-'t update Pokemon - Check server logs " );
  }
}
