import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuesitonMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuesitonMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuesitonMapper.toPrisma(question)

    await this.prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) return null

    return PrismaQuesitonMapper.toDomain(question)
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) return null

    return PrismaQuesitonMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const limit = 20
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return questions.map(PrismaQuesitonMapper.toDomain)
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuesitonMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }
}
