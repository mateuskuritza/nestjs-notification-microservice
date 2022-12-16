import makeNotification from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { NotificationNotRead } from './errors/notification-not-read-error';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const unreadNotification = new UnreadNotification(
    inMemoryNotificationsRepository,
  );

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });
    await inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification if not read yet', async () => {
    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);

    expect(
      unreadNotification.execute({
        notificationId: notification.id,
      }),
    ).rejects.toThrowError(NotificationNotRead);
  });

  it('should not be able to unread notification when it not exists', async () => {
    expect(
      unreadNotification.execute({
        notificationId: randomUUID(),
      }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
