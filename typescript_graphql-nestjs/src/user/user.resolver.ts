import 'reflect-metadata';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserCreateInput } from './dto/create-user.input';
import { UserUniqueInput } from './dto/get-user.input';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signupUser(
    @Args('data') userCreateInput: UserCreateInput,
  ): Promise<User> {
    return await this.userService.create(userCreateInput);
  }

  @Query(() => User)
  async posts(@Args('id') id: number): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Query(() => [User], { nullable: true })
  async allUsers(): Promise<User[] | null> {
    return await this.userService.findAll();
  }

  @Query(() => [Post], { nullable: true })
  async draftsByUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  ): Promise<Post[] | null> {
    return await this.userService.draftByUser(userUniqueInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') userId: number,
    @Args('data') userUpdateInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(userId, userUpdateInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') userId: number): Promise<User> {
    return await this.userService.remove(userId);
  }
}
