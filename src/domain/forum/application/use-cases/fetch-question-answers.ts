import { Either, right } from '@/core/either'
import { AnswerRepository } from '../repositories//answers-repository'
import { Injectable } from '@nestjs/common'
import { AnswerWithAuthor } from '../../enterprise/entities/value-objects/answer-with-author'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: AnswerWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionIdWithAuthor(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
