import {AuthChecker} from "type-graphql";
import {verify} from "jsonwebtoken";
import AuthConfig from '../config/auth';

interface Context {
  token?: string;
}

const AuthenticationAssurance: AuthChecker<Context> = ({ context }): boolean => {
  const authHeader = context.token;

  if(!authHeader) {
    return false;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);

    return !!decoded;
  } catch {
    return false;
  }
}

export default AuthenticationAssurance;
