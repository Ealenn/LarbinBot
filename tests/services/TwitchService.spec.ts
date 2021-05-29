import 'reflect-metadata'
import { AppConfiguration, IConfiguration, TwitchConfiguration } from '../../src/Configuration';
import { ILoggerService, ITwitchService, TwitchService } from '../../src/services';
import { It, Mock, Times } from 'moq.ts';
import { ITmiFactory } from '../../src/factory/TmiFactory';
import { ChatUserstate, Client } from 'tmi.js';
import { CommandPolicies, ICommand } from '../../src/lib/Commands';

describe('Service - Twitch', function () {
  let twitchService : TwitchService;
  let mockConfiguration : Mock<IConfiguration>;
  const twitchConfiguration = {
    Channel: 'TestChannel'
  } as TwitchConfiguration;
  const appConfiguration = {
    ThresholdInSeconds: 2
  } as AppConfiguration;
  let mockLoggerService : Mock<ILoggerService>;
  let mockTmiFactory : Mock<ITmiFactory>;
  let mockClient : Mock<Client>;
  let mockCommand: ICommand;

  beforeEach(() => {
    // Mock
    mockConfiguration = new Mock<IConfiguration>();
    mockConfiguration.setup(x => x.Twitch).returns(twitchConfiguration);
    mockConfiguration.setup(x => x.App).returns(appConfiguration);
    mockLoggerService = new Mock<ILoggerService>();
    mockTmiFactory = new Mock<ITmiFactory>();
    mockClient = new Mock<Client>();
    mockTmiFactory.setup(x => x.Client).returns(mockClient.object());

    // Service
    twitchService = new TwitchService(mockLoggerService.object(), mockConfiguration.object(), mockTmiFactory.object());

    // Commands
    const policies = new CommandPolicies();
    policies.Others = true;

    mockCommand = {
      Action: () => {},
      CanAction: () => true,
      Policies: policies,
      Trigger: '!test'
    };

    twitchService.AddCommand(mockCommand);
  });

  it('Threshold', async function () {
    // Arrange
    const fakeCommand = '!TestThreshold';
    const sleep = () => new Promise<void>(resolve => setTimeout(resolve, 2200));

    // Act
    const result1 = twitchService["_thresholdValidation"](fakeCommand);
    const result2 = twitchService["_thresholdValidation"](fakeCommand);
    const result3 = twitchService["_thresholdValidation"](fakeCommand);
    await sleep();
    const result4 = twitchService["_thresholdValidation"](fakeCommand);
    const result5 = twitchService["_thresholdValidation"](fakeCommand);

    // Assert
    expect(result1).toBeTruthy();
    expect(result2).toBeFalsy();
    expect(result3).toBeFalsy();
    expect(result4).toBeTruthy();
    expect(result5).toBeFalsy();
  }, 10 * 1000);

  it('CommandStats', async function () {
    // Arrange
    const fakeCommand = '!TestCommandStats';
    const sleep = () => new Promise<void>(resolve => setTimeout(resolve, 2200));

    // Act
    twitchService["_thresholdValidation"](fakeCommand);
    await sleep();
    twitchService["_thresholdValidation"](fakeCommand);
    await sleep();
    twitchService["_thresholdValidation"](fakeCommand);
    const result = twitchService["_commandsStats"].get(fakeCommand);

    // Assert
    expect(result).toBeDefined();
    expect(result?.Count).toBe(3);
  }, 10 * 1000);

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
