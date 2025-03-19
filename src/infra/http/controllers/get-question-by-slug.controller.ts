import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { QuestionPresenter } from '@/infra/http/presenters/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private readonly getQuestionBySlugs: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlugs.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      question: QuestionPresenter.toHTTP(result.value.question),
    }
  }
}
