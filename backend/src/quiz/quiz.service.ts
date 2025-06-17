import { Injectable } from '@nestjs/common';
import { QuizInput } from './dto/quiz.input';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuizService {
    constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

    async create(quizInput: QuizInput): Promise<Quiz> {
        const newQuiz = new this.quizModel(quizInput);
        return newQuiz.save(); // Si vous utilisez Mongoose
    }
    async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
    }

    async findOne(id: string): Promise<Quiz | null> {
        return this.quizModel.findById(id).exec();
    }
}
