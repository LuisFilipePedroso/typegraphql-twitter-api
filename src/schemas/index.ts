import { buildSchemaSync } from 'type-graphql';
import Tweet from './Tweet';
import TweetController from '../controllers/TweetController';

const schema = buildSchemaSync({
  resolvers: [Tweet, TweetController]
})

export default schema;
