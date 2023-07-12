import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Post } from '@prisma/client';
import { UserCreateInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserUniqueInput } from './dto/get-user.input';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userCreateInput: UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userCreateInput.email,
      },
      include: {
        posts: true,
      },
    });

    if (user) {
      throw new HttpException('Sorry user exist', HttpStatus.BAD_REQUEST);
    }
    const postData = userCreateInput.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined };
    });
    return await this.prisma.user.create({
      data: {
        name: userCreateInput.name,
        email: userCreateInput.email,
        posts: {
          create: postData,
        },
      },
      include: {
        posts: true,
      },
    });
  }

  async findAll(): Promise<User[] | null> {
    return await this.prisma.user.findMany({ include: { posts: true } });
  }

  async findOne(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async draftByUser(userUniqueInput: UserUniqueInput): Promise<Post[] | null> {
    return await this.prisma.user
      .findUnique({
        where: {
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      });
  }

  async update(
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: updateUserInput.name,
        email: updateUserInput.email,
      },
    });

    return updateUser;
  }

  async remove(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
