import { PostCreateInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(PostCreateInput) {
  @Field(() => Int)
  id: number;
}
