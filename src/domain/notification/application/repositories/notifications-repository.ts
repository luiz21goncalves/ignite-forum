import { Notification } from '../../enterprise/entities/notifications'

export type NotificationsRepository = {
  create(notification: Notification): Promise<void>
}
