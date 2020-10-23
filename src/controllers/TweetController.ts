import {Arg, Authorized, Mutation, Query, Resolver} from 'type-graphql';
import Tweet, { TweetPagination } from '../schemas/Tweet';
import MongoTweet from '../database/schemas/Tweet';

@Resolver(Tweet)
class TweetController {

  @Query(returns => TweetPagination, { name: 'tweets' })
  @Authorized()
  async find(
    @Arg("page") page: number,
    @Arg("pageSize") pageSize: number) {
    const tweets = await MongoTweet.find().sort({ createdAt: -1 }).limit(pageSize).skip(pageSize * page);

    const total = await MongoTweet.countDocuments();

    return { tweets, totalPages: Math.ceil(total / pageSize), };
  }

  @Query(returns => Tweet, { name: 'tweet' })
  @Authorized()
  async findById(
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id);

    if(!tweet) {
      throw new Error('Tweet does not exists');
    }

    return tweet;
  }

  @Mutation(returns => Tweet, { name: 'createTweets' })
  @Authorized()
  async create(
    @Arg("author") author: string,
    @Arg("description") description: string
  ) {
    const tweet = await MongoTweet.create({ author, description, likes: 0 });

    return tweet;
  }

  @Mutation(returns => Tweet, { name: 'updateTweet' })
  @Authorized()
  async update(
    @Arg("id") id: string,
    @Arg("author") author?: string,
    @Arg("description") description?: string
  ) {
    const tweet = await MongoTweet.findByIdAndUpdate(id, { author, description, likes: 0 }, { new: true });

    return tweet;
  }

  @Mutation(returns => Tweet)
  @Authorized()
  async upvoteTweet (
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id);

    if(!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes + 1 });

    await tweet.save();

    return tweet;
  }

  @Mutation(returns => Tweet)
  @Authorized()
  async downvoteTweet (
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id);

    if(!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes - 1 });

    await tweet.save();

    return tweet;
  }
}

export default TweetController;
