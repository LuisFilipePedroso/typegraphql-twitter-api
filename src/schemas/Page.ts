import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class PageInfo {

  @Field({ nullable: true })
  hasNextPage: boolean;
  @Field({ nullable: true })
  hasPreviousPage: boolean;
  @Field({ nullable: true })
  startCursor: string;
  @Field({ nullable: true })
  endCursor: string;
}

export default PageInfo;
