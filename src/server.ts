import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';

import './database';
import './database/schemas/Tweet';

import schema from './schemas';

const server = new ApolloServer({ schema });

server.listen({ port: 4000 }, () => console.log('Server is running on port 4000'))
