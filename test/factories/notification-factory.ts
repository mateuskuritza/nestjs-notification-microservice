import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';
import { randomUUID } from 'crypto';

type Override = Partial<NotificationProps>;

export default function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Random Content'),
    recipientId: randomUUID(),
    ...override,
  });
}
