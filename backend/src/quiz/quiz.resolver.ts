import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { QuizInput } from './dto/quiz.input';
import { Quiz } from './schemas/quiz.schema';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

   @Query(() => [Quiz], { name: 'quizzes' })
  async getAllQuizzes() {
    return this.quizService.findAll();
  }

  @Mutation(() => Quiz)
  async createQuiz(@Args('input') input: QuizInput): Promise<Quiz> {
    return this.quizService.create(input);
  }
}
