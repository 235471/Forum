import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  private readonly salt = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.salt)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
