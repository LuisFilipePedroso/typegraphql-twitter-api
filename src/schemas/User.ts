import {IUser} from '../database/schemas/User';
import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
class User implements IUser {

  @Field(type => ID, { nullable: true })
  _id: any;

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
