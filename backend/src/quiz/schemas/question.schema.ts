import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Question {
  @Field(() => String)
  @Prop({ required: true })
  text: string;

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  options: string[];

  @Field(() => Number)
  @Prop({ required: true })
  correctOption: number;

  @Field(() => String, { nullable: true })
  @Prop()
  explanation?: string;

  @Field(() => Number, { defaultValue: 1 })
  @Prop({ default: 1 })
  points: number;
}