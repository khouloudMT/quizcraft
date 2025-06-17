import { QuizModule } from './quiz/quiz.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    QuizModule,
    MongooseModule.forRoot('mongodb://localhost:27017/quizcraft'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,  
      playground: true,     
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
