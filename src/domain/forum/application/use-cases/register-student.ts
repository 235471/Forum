import { StudentRepository } from './../repositories/student-repository'
import { Student } from '../../enterprise/entities/student'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentsAlreadyExistsError } from './errors/students-already-exists-error'
interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentsAlreadyExistsError,
  {
    student: Student
  }
>
@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const sameEmail = await this.studentRepository.findByEmail(email)

    if (sameEmail) return left(new StudentsAlreadyExistsError(email))

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentRepository.create(student)

    return right({ student })
  }
}
