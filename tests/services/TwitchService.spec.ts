import 'reflect-metadata'
import { IConfiguration, TwitchConfiguration } from '../../src/Configuration';
import { ILoggerService, ITwitchService, TwitchService } from '../../src/services';
import { It, Mock, Times } from 'moq.ts';
import { ITmiFactory } from '../../src/factory/TmiFactory';
import { Client } from 'tmi.js';

describe('Service - Twitch', function () {
  let twitchService : ITwitchService;
  let mockConfiguration : Mock<IConfiguration>;
  const twitchConfiguration = {
    Channel: 'TestChannel'
  } as TwitchConfiguration;
  let mockLoggerService : Mock<ILoggerService>;
  let mockTmiFactory : Mock<ITmiFactory>;
  let mockClient : Mock<Client>;

  beforeEach(() => {
    // Mock
    mockConfiguration = new Mock<IConfiguration>();
    mockConfiguration.setup(x => x.Twitch).returns(twitchConfiguration);
    mockLoggerService = new Mock<ILoggerService>();
    mockTmiFactory = new Mock<ITmiFactory>();
    mockClient = new Mock<Client>();
    mockTmiFactory.setup(x => x.Client).returns(mockClient.object());

    // Service
    twitchService = new TwitchService(mockLoggerService.object(), mockConfiguration.object(), mockTmiFactory.object());
  });

  it('Write', async function () {
    // Arrange
    const message = 'Hello !';
    mockClient.setup(x => x.say(twitchConfiguration.Channel, It.IsAny())).returns(new Promise<[string]>(() => {}));

    // Act
    twitchService.Write(message);

    // Assert
    mockClient.verify(x => x.say(twitchConfiguration.Channel, message), Times.Once());
  });
});
