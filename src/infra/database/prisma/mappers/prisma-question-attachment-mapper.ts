import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Question ID is required for attachment')
    }

    return QuestionAttachment.create(
      {
        questionId: new UniqueEntityId(raw.questionId),
        attachmentId: new UniqueEntityId(raw.id),
      },
      new UniqueEntityId(),
    )
  }
}
