import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTweet', () => {
    it('it should create a tweet', () => {
      //arrange
      service.tweets = [];
      const payload = 'this is my tweet';

      //act
      const tweet = service.createTweet(payload);

      //assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('it should prevent tweet greater than 100 characters', () => {
      //arrange
      const payload =
        'This is a tweet that is greater that 100 character, please read carefully, there are hooks and other things put in place and it must be greater t';

      //act

      const tweet = () => {
        return service.createTweet(payload);
      };
      //assert
      expect(tweet).toThrowError();
    });
  });

  describe('updateTweet', () => {
    it('should update tweet and return a tweet', () => {
      //arrange
      service.tweets = ['hello testing'];
      const id = 0;
      const payload = 'testing updated';
      //action
      const tweet = service.updateTweet(payload, id);

      //assert
      expect(tweet).toBe(payload);
      expect(service.tweets[0]).toBe(payload);
    });

    it('it should create an err if a tweet to be update > 100', () => {
      //arrage
      service.tweets = ['testing'];
      const id = 0;
      const payload =
        'This is a tweet that we want to update and it should return an error if the string length of this payload is more than 1000';

      //action
      const tweet = () => {
        return service.updateTweet(payload, id);
      };

      expect(tweet).toThrowError();
    });
  });

  describe('getTweet', () => {
    it('it should get all tweets', () => {
      //payload
      service.tweets = [
        'testing tweet 1',
        'testing tweet 2',
        'testing tweet 3',
      ];
      //action
      const twwets = service.getTweets();

      //assert
      twwets.forEach((tweet) => expect(typeof tweet).toBe('string'));
      expect(twwets).toHaveLength(3);
    });
  });

  describe('deleteTweet', () => {
    it('delete and return deleted tweet', () => {
      //payload
      service.tweets = ['test tweet'];
      const id = 0;
      const tweet = service.deleteTweet(id);

      expect(tweet).toBe('test tweet');
      expect(service.tweets[id]).toBe(undefined);
      expect(service.tweets).toHaveLength(0);
    });
  });
});
