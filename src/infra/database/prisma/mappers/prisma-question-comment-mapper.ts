import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment as PrismaComment, Prisma } from '@prisma/client'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.questionId) {
      throw new Error('Question ID is required')
    }

    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    questionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      content: questionComment.content,
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId?.toString(),
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}
