import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  describe('Valid', () => {
    it('should be able to create a notification', () => {
      const content = new Notification({
        content: new Content('Nova solicitação de amizade'),
        category: 'social',
        recipientId: randomUUID(),
      });
      expect(content).toBeTruthy();
    });
  });
});
