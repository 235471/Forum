import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/answer-with-author'
import { Answer as PrismaAnswer, User as PrismaUser } from '@prisma/client'

type PrismaAnswerWithAuthor = PrismaAnswer & {
  author: PrismaUser
}

export class PrismaAnswerWithAuthorMapper {
  static toDomain(raw: PrismaAnswerWithAuthor): AnswerWithAuthor {
    return AnswerWithAuthor.create({
      answerId: new UniqueEntityId(raw.id),
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      author: raw.author.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
