import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../schemas/User";
import MongoUser from "../database/schemas/User";
import { hash } from 'bcryptjs';

@Resolver(User)
class UserController {

  @Query(returns => [User], { name: 'users' })
  async find() {
    const users = await MongoUser.find().select(['id', 'name', 'email', 'createdAt', 'updatedAt']);

    return users;
  }

  @Query(returns => User, { name: 'user' })
  async findById(
    @Arg("id") id: string
  ) {
    const user = await MongoUser.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }

  @Mutation(returns => User, { name: 'createUser' })
  async create(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
  ) {
    const hashedPassword = await hash(password, 8);

    const user = await MongoUser.create({ name, email, password: hashedPassword });

    return user;
  }
}

export default UserController;
