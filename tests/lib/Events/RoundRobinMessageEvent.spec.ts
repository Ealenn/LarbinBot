import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { EventType, JoinEventParams, RoundRobinMessageEvent } from '../../../src/lib/Events';
import { ITwitchService } from '../../../src/services';

describe('Events - RoundRobinMessageEvent', () => {

  it('Message', async () => {
    // Arrange
    const _EventType = EventType.JOIN;
    const _EventParams = {
      Channel: 'Example',
      Username: 'John'
    } as JoinEventParams;

    const messages = [
      'test1',
      'test2',
      'test3'
    ];
    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();
    const event = new RoundRobinMessageEvent(_EventType, messages);

    // Act
    for (let index = 0; index < 30; index++) {
      event.Action(twitchService.object(), _EventParams);
    }

    // Assert
    expect(event.Type).toBe(_EventType);
    twitchService.verify(x => x.Write(messages[0]), Times.Exactly(10));
    twitchService.verify(x => x.Write(messages[1]), Times.Exactly(10));
    twitchService.verify(x => x.Write(messages[2]), Times.Exactly(10));
  });
});
