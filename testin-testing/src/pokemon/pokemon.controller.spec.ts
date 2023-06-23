import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('PokemonController', () => {
  let pokemonController: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
      controllers: [PokemonController],
    }).compile();

    pokemonController = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
  });
});
