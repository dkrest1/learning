import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post as PostModel } from '@prisma/client';
import { title } from 'process';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPostDraft(
    @Args('createPostInput')
    createPostInput: {
      title: string;
      content: string;
      authorEmail: string;
    },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = createPostInput;
    return await this.postsService.createPost({
      title,
      content,
      author: { connect: { email: authorEmail } },
    });
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll(): Promise<PostModel[]> {
    return await this.postsService.posts({});
  }

  @Query(() => [Post], { name: 'publised Post' })
  async getPublishedPost(): Promise<PostModel[]> {
    return await this.postsService.posts({ where: { published: true } });
  }

  @Query(() => Post, { name: 'post' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PostModel> {
    return await this.postsService.post({ id });
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: number,
    @Args('updatePostInput')
    updatePostInput: { title: string; content: string },
  ): Promise<PostModel> {
    return await this.postsService.updatePost({
      where: { id },
      data: updatePostInput,
    });
  }

  @Mutation(() => Post)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    return await this.postsService.deletePost({ id });
  }
}
