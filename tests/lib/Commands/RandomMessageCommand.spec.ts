import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies, RandomMessageCommand } from '../../../src/lib/Commands';
import { ITwitchService } from '../../../src/services';

describe('Commands - RandomMessageCommand', function () {

  it('Message', async function () {
    // Arrange
    const Trigger = '!command';
    const FullText = Trigger;
    const Policies = {
      OnlyMods: true
    } as CommandPolicies;

    const messages = [
      'test1',
      'test2',
      'test3'
    ];
    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();
    const command = new RandomMessageCommand(Trigger, Policies, messages);

    // Act
    for (let index = 0; index < 20; index++) {
      command.Action(twitchService.object());
    }

    // Assert
    expect(command.Trigger).toBe(Trigger);
    expect(command.Policies).toBe(Policies);
    twitchService.verify(x => x.Write(messages[0]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[1]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[2]), Times.AtLeastOnce());
  });
});
