import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerWithAuthor } from '../../enterprise/entities/value-objects/answer-with-author'

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<void>
  abstract save(question: Answer): Promise<void>
  abstract findById(id: string): Promise<Answer | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerWithAuthor[]>

  abstract delete(answer: Answer): Promise<void>
}
