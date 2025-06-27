import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

@ObjectType()
export class Question {
  @Field()
  text: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field()
  correctAnswer: string;
}

@Schema()
@ObjectType()
export class Quiz extends Document {
  @Field(() => ID)
  declare _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ type: [Object], required: true })
  @Field(() => [Question])
  questions: Question[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @Field(() => User)
  creator: User;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
export type QuizDocument = Quiz & Document;