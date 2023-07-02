import { InputType, Field } from '@nestjs/graphql';
import { PostCreateInput } from 'src/post/dto/create-post.input';

@InputType()
export class UserCreateInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput];
}
