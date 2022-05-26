import 'reflect-metadata'
import { It, Mock, Times } from 'moq.ts';
import { CommandPolicies, TwitterCommand } from '../../../../src/lib/Commands';
import { ITwitchService } from '../../../../src/services';
import { Configuration } from '../../../../src/Configuration';
import { SendTweetV2Params, TwitterApi } from 'twitter-api-v2';
import TwitterApiv2ReadWrite from 'twitter-api-v2/dist/v2/client.v2.write';

describe('Commands - Socials - TwitterCommand', () => {

  it('Action', async () => {
    // Arrange
    const Trigger = '!command';
    const Policies = new CommandPolicies();

    const argFooter = 'example footer';

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();

    const configuration = new Configuration();
    const command = new TwitterCommand(Trigger, Policies, configuration, argFooter);

    const twitterClientV2Mock = new Mock<TwitterApiv2ReadWrite>();
    twitterClientV2Mock.setup(async x => x.tweet(It.IsAny())).returnsAsync({} as never);
    command['_twitterClient'] = {
      v2: twitterClientV2Mock.object()
    } as TwitterApi;

    // Act
    await command.Action(twitchService.object(), `${Trigger} hello`, {});

    // Assert
    twitterClientV2Mock.verify(x => x.tweet(It.IsAny<SendTweetV2Params>()), Times.Once());
    twitterClientV2Mock.verify(x => x.tweet(It.Is<SendTweetV2Params>(y => y.text === 'hello example footer')), Times.Once());
  });

  it('Action with oversized message', async () => {
    // Arrange
    const Trigger = '!command';
    const Policies = new CommandPolicies();

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();

    const configuration = new Configuration();
    const command = new TwitterCommand(Trigger, Policies, configuration, '');

    const twitterClientV2Mock = new Mock<TwitterApiv2ReadWrite>();
    twitterClientV2Mock.setup(async x => x.tweet(It.IsAny())).returnsAsync({} as never);
    command['_twitterClient'] = {
      v2: twitterClientV2Mock.object()
    } as TwitterApi;

    // Act
    const message = new Array(281).fill('a').join('');
    await command.Action(twitchService.object(), `${Trigger} ${message}`, {});

    // Assert
    twitchService.verify(x => x.Write(It.Is<string>(y => y.includes('The tweet is too long'))));
    twitterClientV2Mock.verify(x => x.tweet(It.IsAny<SendTweetV2Params>()), Times.Never());
  });

  it('Action with not ready client', async () => {
    // Arrange
    const Trigger = '!command';
    const Policies = new CommandPolicies();

    const twitchService = new Mock<ITwitchService>();
    twitchService.setup(x => x.Write(It.IsAny())).returns();

    const configuration = new Configuration();
    const command = new TwitterCommand(Trigger, Policies, configuration, '');

    // Act
    await command.Action(twitchService.object(), `${Trigger} hello`, {});

    // Assert
    twitchService.verify(x => x.Write(It.IsAny<string>()), Times.Once());
    twitchService.verify(x => x.Write(It.Is<string>(y => y.includes("I don't have access to twitter"))), Times.Once());
  });
});
