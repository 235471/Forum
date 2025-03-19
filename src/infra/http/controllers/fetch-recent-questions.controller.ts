import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { QuestionPresenter } from '@/infra/http/presenters/question-presenter'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '../pipes/page-validation.pipe'

@Controller('/questions')
export class FetchRecentQuestionController {
  constructor(
    private readonly fetchRecentQuestions: FetchRecentQuestionsUseCase,
  ) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questions = result.value.questions

    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
