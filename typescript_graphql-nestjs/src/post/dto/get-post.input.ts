import { InputType, Int, Field } from '@nestjs/graphql';
import { SortOrderEnum } from '../enums/sort-order.enum';

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrderEnum)
  updatedAt: SortOrderEnum;
}
