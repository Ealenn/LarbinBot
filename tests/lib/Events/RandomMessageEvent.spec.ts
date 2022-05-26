import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { EventType, JoinEventParams, RandomMessageEvent } from '../../../src/lib/Events';
import { ITwitchService } from '../../../src/services';

describe('Events - RandomMessageEvent', () => {

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
    const event = new RandomMessageEvent(_EventType, messages);

    // Act
    for (let index = 0; index < 20; index++) {
      event.Action(twitchService.object(), _EventParams);
    }

    // Assert
    expect(event.Type).toBe(_EventType);
    twitchService.verify(x => x.Write(messages[0]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[1]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[2]), Times.AtLeastOnce());
  });
});
