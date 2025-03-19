import { Entity } from '@/core/entities/entitiy'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

export interface AnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

@Injectable()
export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}
