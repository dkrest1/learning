import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UserCreateInput } from './dto/create-user.input';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  const user = {
    id: 1,
    email: 'tosin@gmail.com',
    name: 'tosin',
    posts: [
      {
        id: 1,
        title: 'army',
        content: 'I graduated from army day',
        published: false,
      },
    ],
  };

  const users = [
    {
      id: 1,
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
    {
      id: 2,
      email: 'nilu@prisma.io',
      name: 'Nilu',
      posts: [],
    },
  ];

  let userService: UserService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create user', () => {
    const userCreateInputDTO: UserCreateInput = {
      email: 'tosin@gmail.com',
      name: 'tosin',
      posts: [
        {
          title: 'army',
          content: 'I graduated from army day',
        },
      ],
    };

    it('should create and return a new user with a post', async () => {
      prisma.user.create.mockResolvedValue(user);

      const createdUser = await userService.create(userCreateInputDTO);
      expect(createdUser).toEqual(user);
    });

    it('should throw a bad request exception if the user already exists', async () => {
      prisma.user.findUnique.mockResolvedValue(user);

      const existedUser = userService.create(userCreateInputDTO);
      await expect(existedUser).rejects.toThrowError(
        new HttpException('Sorry user exist', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('get all users', () => {
    it('it should return all users', async () => {
      prisma.user.findMany.mockResolvedValue(users);
      const allUsers = await userService.findAll();

      expect(allUsers).toEqual(users);
    });
  });

  describe('get a user', () => {
    // beforeEach(() => {
    //   prisma.user.findUnique.mockResolvedValue(user);
    // });

    it('return a user if it exist', async () => {
      prisma.user.findUnique.mockResolvedValue(user);
      expect(await userService.findOne(1)).toBe(user);
    });

    it('throw a user does not exist error, if no user was found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(userService.findOne(5)).rejects.toThrowError(
        new HttpException('User does not exist', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('get all draft posts by a user', () => {});

  describe('update an existing user', () => {});

  describe('delete an existing user', () => {});

  describe('throw a user not found error if an existing user to delete deos not exist', () => {});
});
