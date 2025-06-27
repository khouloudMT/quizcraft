import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Quiz } from './schemas/quiz.schema';
import { User } from '../user/schemas/user.schema';
import { SubmissionInput } from './dto/submission.input';
import { QuizService } from './quiz.service';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
    private quizService: QuizService,
  ) {}

  async submit(input: SubmissionInput, user: User): Promise<Submission> {
    const quiz = await this.quizService.findById(input.quizId);
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${input.quizId} not found`);
    }

    const score = this.calculateScore(quiz, input.answers);
    
    const submission = new this.submissionModel({
      quiz: quiz._id,
      user: user._id,
      answers: input.answers,
      score,
    });

    await submission.save();
    const result = await this.submissionModel.findById(submission._id)
    if (!result) {
      throw new NotFoundException(`Submission with ID ${submission._id} not found`);
    }
    return (await result
      .populate('quiz'))
      .populate<{ user: User }>('user')
;
  }

  async findByUser(userId: string): Promise<Submission[]> {
    return this.submissionModel
      .find({ user: userId })
      .populate('quiz')
      .populate('user')
      .exec();
  }

  async findByQuiz(quizId: string): Promise<Submission[]> {
    return this.submissionModel
      .find({ quiz: quizId })
      .populate('quiz')
      .populate('user')
      .exec();
  }

  private calculateScore(quiz: Quiz, answers: number[]): number {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (Number(answers[index]) === Number(question.correctAnswer)) {
        score += 1;
      }
    });
    return score;
  }
}