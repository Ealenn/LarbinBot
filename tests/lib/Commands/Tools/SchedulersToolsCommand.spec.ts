import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies } from '../../../../src/lib/Commands';
import { SchedulersToolsCommand } from '../../../../src/lib/Commands/Tools';
import { ITwitchService } from '../../../../src/services';
import { Configuration } from '../../../../src/Configuration';

describe('Commands - Tools - SchedulersToolsCommand', function () {

  it('Action', async function () {
    // Arrange
    const Trigger = '!command';
    const FullText = Trigger;
    const Policies = {
      OnlyMods: true
    } as CommandPolicies;

    const argStatus = 'status';
    const argOn = 'on';
    const argOff = 'off';

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();

    const configuration = new Configuration();
    const command = new SchedulersToolsCommand(Trigger, Policies, configuration, argOn, argOff, argStatus);

    // Act
    command.Action(twitchService.object(), `${Trigger} ${argOn}`);
    command.Action(twitchService.object(), `${Trigger} ${argOff}`);

    // Assert
    twitchService.verify(x => x.Write(It.Is<string>(y => y.includes('ON'))), Times.Once());
    twitchService.verify(x => x.Write(It.Is<string>(y => y.includes('OFF'))), Times.Once());
  });
});
