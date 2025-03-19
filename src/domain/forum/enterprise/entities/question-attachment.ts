import { Entity } from '@/core/entities/entitiy'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

export interface QuestionAttachmentProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

@Injectable()
export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityId) {
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }
}
