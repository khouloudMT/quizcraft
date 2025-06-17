import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionInput {
 @Field()
  text: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field()
  correctAnswer: string;
}