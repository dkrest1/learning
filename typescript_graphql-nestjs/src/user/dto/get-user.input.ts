import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}
