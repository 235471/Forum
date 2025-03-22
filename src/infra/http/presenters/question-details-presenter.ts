import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      title: questionDetails.title,
      slug: questionDetails.slug,
      content: questionDetails.content,
      authorId: questionDetails.authorId.toString(),
      author: questionDetails.author,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: questionDetails.bestAnswerId?.toString() ?? undefined,
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt ?? undefined,
    }
  }
}
