import makeNotification from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { NotificationNotFound } from './errors/notification-not-found-error';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const readNotification = new ReadNotification(
    inMemoryNotificationsRepository,
  );

  it('should be able to read a notification', async () => {
    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read notification when it not exists', async () => {
    expect(
      readNotification.execute({
        notificationId: randomUUID(),
      }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
