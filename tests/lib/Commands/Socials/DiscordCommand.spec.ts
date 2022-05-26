import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies, DiscordCommand } from '../../../../src/lib/Commands';
import { ITwitchService } from '../../../../src/services';
import { Configuration } from '../../../../src/Configuration';
import { REST as Discord, RequestData } from '@discordjs/rest';

describe('Commands - Socials - DiscordCommand', () => {

  it('Action', async () => {
    // Arrange
    const Trigger = '!command';
    const Policies = new CommandPolicies();

    const argChannelId = '111222333';

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();

    const configuration = new Configuration();
    configuration.Discord.Token = 'token';
    const command = new DiscordCommand(Trigger, Policies, configuration, argChannelId);

    const discordMock = new Mock<Discord>();
    discordMock.setup(async x => x.post(It.IsAny())).returnsAsync({} as never);
    command['_discordClient'] = discordMock.object();

    // Act
    await command.Action(twitchService.object(), `${Trigger} hello`, {});

    // Assert
    discordMock.verify(x => x.post('/channels/111222333/messages', It.Is<any>(y => y.body.content === 'hello')), Times.Once());
  });
});
