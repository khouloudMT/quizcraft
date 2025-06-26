import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class SubmissionInput {
  @Field(() => String)
  @IsNotEmpty()
  quizId: string;

  @Field(() => [Number])
  @IsArray()
  @IsNumber({}, { each: true })
  answers: number[];
}