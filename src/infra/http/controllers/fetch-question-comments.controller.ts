import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import {
  PageQueryParamSchema,
  queryValidationPipe,
} from '../pipes/page-validation.pipe'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

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

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const comments = result.value?.comments.map(
      CommentWithAuthorPresenter.toHTTP,
    )

    return { comments }
  }
}
