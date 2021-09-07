import { MessageService } from './message.service';
describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  it('add should add', () => {
    messageService.add('msg');
    expect(messageService.messages.length).toBe(1);
  });

  it('clear method should remove all the messages from messages arr', () => {
    messageService.clear();
    expect(messageService.messages.length).toBe(0);
  });
});
