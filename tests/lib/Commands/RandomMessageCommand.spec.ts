import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies, RandomMessageCommand } from '../../../src/lib/Commands';
import { ITwitchService } from '../../../src/services';

describe('Commands - RandomMessageCommand', () => {
  it('Message', async () => {
    // Arrange
    const Trigger = '!command';
    const FullText = Trigger;
    const Policies = new CommandPolicies();

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
      command.Action(twitchService.object(), FullText, {}, { Count: 42, LastTrigger: new Date() });
    }

    // Assert
    expect(command.Trigger).toBe(Trigger);
    expect(command.Policies).toBe(Policies);
    twitchService.verify(x => x.Write(messages[0]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[1]), Times.AtLeastOnce());
    twitchService.verify(x => x.Write(messages[2]), Times.AtLeastOnce());
  });

  it('Stats', async () => {
    // Arrange
    const Trigger = '!command';
    const FullText = Trigger;
    const Policies = new CommandPolicies();

    const messages = ['example {{ Count }} stats'];
    const twitchService = new Mock<ITwitchService>();
    twitchService
      .setup(x => x.Write(It.IsAny()))
      .callback((interaction) => {
        expect(interaction.args[0]).toBe('example 42 stats');
      });
    const command = new RandomMessageCommand(Trigger, Policies, messages);

    // Act
    command.Action(twitchService.object(), FullText, {}, { Count: 42, LastTrigger: new Date() });

    // Assert
    twitchService.verify(x => x.Write(It.IsAny<string>()), Times.Once());
  });
});
