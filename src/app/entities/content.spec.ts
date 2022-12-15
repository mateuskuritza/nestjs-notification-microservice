import { Content } from './content';

describe('Notification Content', () => {
  describe('Valid', () => {
    it('should be able to create a notification content', () => {
      const content = new Content('Você recebeu solicitação de amizade');
      expect(content).toBeTruthy();
    });
  });

  describe('Invalid', () => {
    it('not be able to create with less than 5 characters', () => {
      expect(() => new Content('a')).toThrow();
    });

    it('not be able to create with more than 240 characters', () => {
      expect(() => new Content('a'.repeat(241))).toThrow();
    });
  });
});
