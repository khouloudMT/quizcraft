import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { Submission } from './schemas/submission.schema';
import { SubmissionInput } from './dto/submission.input';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../user/schemas/user.schema';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private submissionService: SubmissionService) {}

  @Mutation(() => Submission)
  @UseGuards(GqlAuthGuard)
  async submitQuiz(
    @Args('input') input: SubmissionInput,
    @CurrentUser() user: User,
  ): Promise<Submission> {
    return this.submissionService.submit(input, user);
  }

  @Query(() => [Submission])
  @UseGuards(GqlAuthGuard)
  async mySubmissions(@CurrentUser() user: User): Promise<Submission[]> {
    return this.submissionService.findByUser(user._id);
  }

  @Query(() => [Submission])
  @UseGuards(GqlAuthGuard)
  async quizSubmissions(@Args('quizId') quizId: string): Promise<Submission[]> {
    return this.submissionService.findByQuiz(quizId);
  }
}