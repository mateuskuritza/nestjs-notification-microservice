import makeNotification from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('Cancel Notification', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const cancelNotification = new CancelNotification(
    inMemoryNotificationsRepository,
  );

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();
    await inMemoryNotificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel notification when it not exists', async () => {
    expect(
      cancelNotification.execute({
        notificationId: randomUUID(),
      }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
