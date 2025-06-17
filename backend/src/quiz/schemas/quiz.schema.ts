import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Quiz extends Document {

  @Field(() => ID)  // Make sure this decorator exists
  declare id: string;
  
  @Prop({ required: true })
  @Field()
  title: string;

  @Field(() => [Question]) // <-- Add this decorator
  @Prop({ type: [Object], required: true })
  questions: Question[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
export type QuizDocument = Quiz & Document;

@ObjectType()
export class Question {
  @Field()
  text: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field()
  correctAnswer: string;
}