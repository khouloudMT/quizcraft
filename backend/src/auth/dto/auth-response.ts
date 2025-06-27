import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/schemas/user.schema';

@ObjectType()
export class AuthResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}