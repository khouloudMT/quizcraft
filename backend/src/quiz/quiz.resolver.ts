import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './schemas/quiz.schema';
import { QuizInput } from './dto/quiz.input';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/schemas/user.schema';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  @Query(() => [Quiz])
  async quizzes() {
    return this.quizService.findAll();
  }

  @Query(() => Quiz)
  async quiz(@Args('id') id: string) {
    return this.quizService.findById(id);
  }

  @Query(() => [Quiz])
  @UseGuards(GqlAuthGuard)
  async myQuizzes(@CurrentUser() user: User) {
    return this.quizService.findByCreator(user._id);
  }

  @Mutation(() => Quiz)
  @UseGuards(GqlAuthGuard)
  async createQuiz(
    @Args('input') input: QuizInput,
    @CurrentUser() user: User,
  ): Promise<Quiz> {
    return this.quizService.create(input, user);
  }

  @Mutation(() => Quiz)
  @UseGuards(GqlAuthGuard)
  async updateQuiz(
    @Args('id') id: string,
    @Args('input') input: QuizInput,
    @CurrentUser() user: User,
  ): Promise<Quiz> {
    return this.quizService.update(id, input, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteQuiz(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.quizService.delete(id, user);
  }
}
