import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies, RoundRobinMessageCommand } from '../../../src/lib/Commands';
import { ITwitchService } from '../../../src/services';

describe('Commands - RoundRobinMessageCommand', function () {

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
      'test3',
    ];
    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();
    const command = new RoundRobinMessageCommand(Trigger, Policies, messages);

    // Act
    for (let index = 0; index < 30; index++) {
      command.Action(twitchService.object());
    }

    // Assert
    expect(command.Trigger).toBe(Trigger);
    expect(command.Policies).toBe(Policies);
    twitchService.verify(x => x.Write(messages[0]), Times.Exactly(10));
    twitchService.verify(x => x.Write(messages[1]), Times.Exactly(10));
    twitchService.verify(x => x.Write(messages[2]), Times.Exactly(10));
  });
});
