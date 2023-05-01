import { Entity } from '@/core/entities/entity'

type StudentProps = {
  name: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }
}
