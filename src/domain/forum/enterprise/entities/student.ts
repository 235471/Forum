import { Entity } from '@/core/entities/entitiy'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface StudentProps {
  name: string
  email: string
  password: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set name(name: string) {
    this.props.name = name
  }

  set email(email: string) {
    this.props.email = email
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id)

    return student
  }
}
