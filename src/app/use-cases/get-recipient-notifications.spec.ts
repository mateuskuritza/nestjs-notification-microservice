import makeNotification from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const getRecipientNotifications = new GetRecipientNotifications(
    inMemoryNotificationsRepository,
  );

  it('should return 0 if not exists a notification for recipientId', async () => {
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: randomUUID(),
    });

    expect(notifications.length).toBe(0);
  });

  it('should return 2 if exists two notification for recipientId and another with diferent recipientId', async () => {
    const recipientId = randomUUID();

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    await inMemoryNotificationsRepository.create(makeNotification());

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications.length).toBe(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId,
        }),
        expect.objectContaining({
          recipientId,
        }),
      ]),
    );
  });
});
