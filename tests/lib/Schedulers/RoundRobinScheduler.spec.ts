import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { RoundRobinScheduler } from '../../../src/lib/Schedulers';
import { ITwitchService } from '../../../src/services';

describe('Schedulers - RoundRobinMessageEvent', function () {

  it('Message', async function () {
    // Arrange
    const Id = 'Test#Id';
    const Minutes = 42;
    const Messages = [
      'test1',
      'test2',
      'test3'
    ];

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();
    const scheduler = new RoundRobinScheduler(Id, Minutes, Messages);

    // Act
    for (let index = 0; index < 30; index++) {
      scheduler.Action(twitchService.object());
    }

    // Assert
    expect(scheduler.Id).toBe(Id);
    expect(scheduler.Minutes).toBe(Minutes);
    twitchService.verify(x => x.Write(Messages[0]), Times.Exactly(10));
    twitchService.verify(x => x.Write(Messages[1]), Times.Exactly(10));
    twitchService.verify(x => x.Write(Messages[2]), Times.Exactly(10));
  });
});
