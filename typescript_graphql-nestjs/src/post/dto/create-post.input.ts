import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;
}
