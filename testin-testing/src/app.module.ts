import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [TweetsModule, PokemonModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
