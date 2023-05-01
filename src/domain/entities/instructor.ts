import { Entity } from '@/core/entities/entity'

type InstructorProps = {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name
  }
}
