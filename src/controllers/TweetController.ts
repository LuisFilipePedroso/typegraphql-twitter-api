import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import Tweet, { TweetConnection, TweetMutationInput, TweetMutationPayload } from '../schemas/Tweet';
import MongoTweet, { ITweetDocument } from '../database/schemas/Tweet';

@Resolver(Tweet)
class TweetController {

  @Query(returns => TweetConnection, { name: 'tweets' })
  @Authorized()
  async find(@Arg("first") first: number) {
    const { docs, hasNextPage, hasPrevPage, totalDocs, limit } = await MongoTweet.paginate({}, {
      limit: first,
      options: {
        populate: 'author',
        sort: {
          createdAt: -1
        }
      }
    });

    const edges = (docs as ITweetDocument[])?.map(tweet => ({
      cursor: tweet?.id,
      node: tweet,
    }))

    return {
      edges,
      count: totalDocs,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: hasPrevPage,
        startCursor: edges[0]?.node?.id,
        endCursor: edges[limit - 1]?.node?.id
      }
    };
  }

  @Query(returns => Tweet, { name: 'tweet' })
  @Authorized()
  async findById(
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id).populate('author');

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    return tweet;
  }

  @Mutation(returns => TweetMutationPayload, { name: 'createTweet' })
  @Authorized()
  async create(
    @Arg("data") data: TweetMutationInput
  ) {
    const { author, description } = data;

    const tweet = await MongoTweet.create({ author, description, likes: 0 });

    const savedTweet = await MongoTweet.findById(tweet.id).populate('author');

    const tweetEdge = {
      cursor: savedTweet?.id,
      node: savedTweet,
    }

    return {
      tweetEdge
    };
  }

  //TODO: fix it
  // @Mutation(returns => Tweet, { name: 'updateTweet' })
  // @Authorized()
  // async update(
  //   @Arg("id") id: string,
  //   @Arg("author") author?: string,
  //   @Arg("description") description?: string
  // ) {
  //   const tweet = await MongoTweet.findByIdAndUpdate(id, { author, description, likes: 0 }, { new: true });
  //
  //   return tweet;
  // }

  @Mutation(returns => Tweet)
  @Authorized()
  async upvoteTweet(
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id).populate('author');

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes + 1 });

    await tweet.save();

    return tweet;
  }

  @Mutation(returns => Tweet)
  @Authorized()
  async downvoteTweet(
    @Arg("id") id: string
  ) {
    const tweet = await MongoTweet.findById(id).populate('author');

    if (!tweet) {
      throw new Error('Tweet does not exists');
    }

    tweet.set({ likes: tweet?.likes - 1 });

    await tweet.save();

    return tweet;
  }
}

export default TweetController;
