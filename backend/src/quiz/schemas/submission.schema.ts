import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Quiz } from './quiz.schema';

export type SubmissionDocument = Submission & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Submission {
  @Field(() => String)
  _id: string;

  @Field(() => Quiz)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz: Quiz;

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Field(() => [Number])
  @Prop({ type: [Number], required: true })
  answers: number[];

  @Field(() => Number)
  @Prop({ required: true })
  score: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);