import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.chooseQuestionBestAnswer.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UnauthorizedException:
          throw new UnauthorizedException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
