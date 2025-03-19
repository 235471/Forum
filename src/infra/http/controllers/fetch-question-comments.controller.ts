import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { CommentPresenter } from '../presenters/comment-presenter'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '../pipes/page-validation.pipe'

@Controller('/questions/:questionId/comments')
@UseGuards(JwtAuthGuard)
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Param('questionId') questionId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchQuestionComments.execute({
      questionId,
      page,
    })

    const comments = result.value?.questionComments.map(CommentPresenter.toHTTP)

    return { comments }
  }
}
