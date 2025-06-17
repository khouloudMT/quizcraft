import { InputType, Field } from '@nestjs/graphql';
import { QuestionInput } from './question.input';


@InputType()
export class QuizInput {
  @Field()
  title: string;

  @Field(() => [QuestionInput])
  questions: QuestionInput[];
}