import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { randomUUID } from 'crypto';
import { CountRecipientNotifications } from './count-notifications';

describe('Count Notifications', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const countRecipientNotifications = new CountRecipientNotifications(
    inMemoryNotificationsRepository,
  );

  it('should return 0 if not exists a notification for recipientId', async () => {
    const { count } = await countRecipientNotifications.execute({
      recipientId: randomUUID(),
    });

    expect(count).toBe(0);
  });

  it('should return 2 if exists two notification for recipientId and another with diferent recipientId', async () => {
    const recipientId = randomUUID();

    await inMemoryNotificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('asdasdasd'),
        recipientId,
      }),
    );

    await inMemoryNotificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('asdasdasd'),
        recipientId,
      }),
    );

    await inMemoryNotificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('asdasdasd'),
        recipientId: randomUUID(),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toBe(2);
  });
});
