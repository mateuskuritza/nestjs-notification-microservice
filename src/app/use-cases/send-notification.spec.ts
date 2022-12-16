import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  const inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
  const sendNotification = new SendNotification(
    inMemoryNotificationsRepository,
  );

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute({
      content: 'A notification content',
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
