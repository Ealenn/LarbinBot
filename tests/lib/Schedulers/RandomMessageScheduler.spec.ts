import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { RandomScheduler } from '../../../src/lib/Schedulers';
import { ITwitchService } from '../../../src/services';

describe('Schedulers - RandomMessageEvent', () => {

  it('Message', async () => {
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
    const scheduler = new RandomScheduler(Id, Minutes, Messages);

    // Act
    for (let index = 0; index < 20; index++) {
      scheduler.Action(twitchService.object());
    }

    // Assert
    expect(scheduler.Id).toBe(Id);
    expect(scheduler.Minutes).toBe(Minutes);
    twitchService.verify(x => x.Write(Messages[0]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(Messages[1]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(Messages[2]), Times.AtLeastOnce());
  });
});
