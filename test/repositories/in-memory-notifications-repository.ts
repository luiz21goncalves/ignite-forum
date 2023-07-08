import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notifications'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[]

  constructor() {
    this.items = []
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
