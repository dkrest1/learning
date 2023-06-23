import { BadRequestException } from '@nestjs/common';
import { PokemonParseIdPipe } from './pokemon-parse-id.pipe';

describe('PokemonParseIdPipe', () => {
  let pipe: PokemonParseIdPipe;

  beforeEach(() => {
    pipe = new PokemonParseIdPipe();
  });

  it('should be defined', () => {
    expect(new PokemonParseIdPipe()).toBeDefined();
  });

  it('throw an error for non numbers', () => {
    const value = () => pipe.transform('hello');

    expect(value).toThrowError(BadRequestException);
  });

  it('it should throw an error for a number < 1', () => {
    const value = () => pipe.transform('0');

    expect(value).toThrowError(BadRequestException);
  });

  it('it should throw an error for a number > 151', () => {
    const value = () => pipe.transform('200');

    expect(value).toThrowError(BadRequestException);
  });
});
