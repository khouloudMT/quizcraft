import { Module } from '@nestjs/common';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Submission, SubmissionSchema } from './schemas/submission.schema';
import { SubmissionService } from './submission.service';
import { SubmissionResolver } from './submission.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  providers: [QuizResolver, QuizService, SubmissionResolver, SubmissionService],
  exports: [QuizService]
})
export class QuizModule {}
