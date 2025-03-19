import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const queryParamSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

type QueryParamSchema = z.infer<typeof queryParamSchema>

const queryValidationPipe = new ZodValidationPipe(queryParamSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async handle(@Query(queryValidationPipe) params: QueryParamSchema) {
    const perPage: number = 20

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (params.page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { questions }
  }
}
