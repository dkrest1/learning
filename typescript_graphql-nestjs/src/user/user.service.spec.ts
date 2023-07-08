import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('should create a new user with a post', async () => {});

  describe('if user exist before creating, throw a Bad Request error', async () => {
    // arrange
  });

  describe('get all users', async () => {});

  describe('get a user', () => {});

  describe('if a user to get does not exist, throw  user not found error ', async () => {});

  describe('get all draft posts by a user', async () => {});

  describe('update an existing user', async () => {});

  describe('delete an existing user', async () => {});

  describe('throw a user not found error if an existing user to delete deos not exist', async () => {});
});
