import { IUser } from '../database/schemas/User';
import { Field, ID, ObjectType } from 'type-graphql';
import Node from './Node';

@ObjectType({ implements: Node })
class User implements IUser, Node {

  @Field(type => ID, { nullable: false })
  id: any;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

export default User;
