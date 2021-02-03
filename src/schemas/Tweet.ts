import { ITweet } from '../database/schemas/Tweet';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import User from "./User";
import PageInfo from "./Page";
import Node from './Node';

@ObjectType({ implements: Node })
class Tweet implements ITweet, Node {

  @Field(type => ID, { nullable: false })
  id: any;

  @Field(type => User, { nullable: true })
  author: User;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: true })
  likes: number;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class TweetConnection {

  @Field(type => [TweetEdge])
  edges: TweetEdge[];

  @Field()
  count: number;

  @Field(type => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class TweetEdge {

  @Field({ nullable: false })
  cursor: string;

  @Field(type => Tweet)
  node: Tweet;
}

@InputType()
export class TweetMutationInput {

  @Field()
  author: string;

  @Field()
  description: string;
}

@ObjectType()
export class TweetMutationPayload {

  @Field(type => TweetEdge)
  tweetEdge: TweetEdge;
}

export default Tweet;
