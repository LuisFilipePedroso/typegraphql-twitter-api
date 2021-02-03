import { Field, InterfaceType, ID } from "type-graphql";

@InterfaceType()
abstract class Node {

  @Field(type => ID, { nullable: false })
  id: any;
}

export default Node;