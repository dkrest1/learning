import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PokemonService],
    })
      .useMocker(createMock)
      .compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('getPokemon', () => {
    it('if pokemon ID is less than 1, it should throw an error', async () => {
      const getPokemon = pokemonService.getPokemon(0);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('if pokemon ID is greater than 151, it should throw a bad request exception', async () => {
      const getPokemon = pokemonService.getPokemon(152);

      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('Valid pokemon shoud return a pokemon name', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: { name: 'bulbasaur' },
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const getPokemon = pokemonService.getPokemon(1);

      await expect(getPokemon).resolves.toBe('bulbasaur');
    });

    it('if Pokemon API unexpectly change, throw an Error ', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: 'Unexpected data',
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });

      const getPoken = pokemonService.getPokemon(1);

      await expect(getPoken).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
