import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  public equals(entity: Entity<any>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id.toString() === this._id.toString()) {
      return true
    }

    return false
  }
}
