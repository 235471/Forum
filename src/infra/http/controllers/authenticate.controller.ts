import { AuthenticateStudentUseCase } from './../../../domain/forum/application/use-cases/authenticate-student'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/domain/forum/application/use-cases/errors/invalid-credentials-error'
import { Public } from '@/infra/auth/public'
const authenicateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenicateBodySchema = z.infer<typeof authenicateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(
    private readonly authenticateStudent: AuthenticateStudentUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenicateBodySchema))
  async handle(@Body() body: AuthenicateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
