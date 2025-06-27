import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { QuizInput } from './dto/quiz.input';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  async create(quizInput: QuizInput, creator: User): Promise<Quiz> {
    try {
      const newQuiz = new this.quizModel({
        ...quizInput,
        creator: new Types.ObjectId(creator._id),
      });
      return await newQuiz.save();
    } catch (error) {
      throw new Error(`Failed to create quiz: ${error.message}`);
    }
  }

  async findAll(): Promise<Quiz[]> {
    try {
      return await this.quizModel.find().populate('creator').exec();
    } catch (error) {
      throw new Error(`Failed to fetch quizzes: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Quiz> {
    try {
      const quiz = await this.quizModel.findById(id).populate('creator').exec();
      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${id} not found`);
      }
      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch quiz: ${error.message}`);
    }
  }

  async findByCreator(creatorId: string): Promise<Quiz[]> {
    try {
      return await this.quizModel
        .find({ creator: new Types.ObjectId(creatorId) })
        .populate('creator')
        .exec();
    } catch (error) {
      throw new Error(`Failed to fetch creator's quizzes: ${error.message}`);
    }
  }

  async update(id: string, quizInput: QuizInput, user: User): Promise<Quiz> {
    try {
      const quiz = await this.findById(id);
      if (quiz.creator._id.toString() !== user._id.toString()) {
        throw new UnauthorizedException('Not authorized to update this quiz');
      }

      const updatedQuiz = await this.quizModel
        .findByIdAndUpdate(
          id,
          { $set: { ...quizInput } },
          { new: true, runValidators: true }
        )
        .populate('creator');

      if (!updatedQuiz) {
        throw new NotFoundException(`Quiz with ID ${id} not found`);
      }

      return updatedQuiz;
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update quiz: ${error.message}`);
    }
  }

  async delete(id: string, user: User): Promise<boolean> {
    try {
      const quiz = await this.findById(id);
      if (quiz.creator._id.toString() !== user._id.toString()) {
        throw new UnauthorizedException('Not authorized to delete this quiz');
      }

      const result = await this.quizModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException(`Quiz with ID ${id} not found`);
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete quiz: ${error.message}`);
    }
  }
}

