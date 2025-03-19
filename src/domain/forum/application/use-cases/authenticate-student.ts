import { StudentRepository } from './../repositories/student-repository'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string
  }
>
@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) return left(new InvalidCredentialsError())

    const isValidPassword = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isValidPassword) return left(new InvalidCredentialsError())

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
