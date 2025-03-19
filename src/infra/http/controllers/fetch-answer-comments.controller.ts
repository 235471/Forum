import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { CommentPresenter } from '../presenters/comment-presenter'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '../pipes/page-validation.pipe'

@Controller('/answers/:answerId/comments')
@UseGuards(JwtAuthGuard)
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Param('answerId') answerId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchAnswerComments.execute({
      answerId,
      page,
    })

    const comments = result.value?.answerComments.map(CommentPresenter.toHTTP)

    return { comments }
  }
}
