import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonParseIdPipe } from './pokemon-parse-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}
  @Get(':id')
  async getPoken(@Param('id', new PokemonParseIdPipe()) id: number) {
    if (id < 1 || id > 151) {
      throw new BadRequestException();
    }
    return await this.pokemonService.getPokemon(id);
  }
}
