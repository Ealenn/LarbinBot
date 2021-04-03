import 'reflect-metadata'
import { LarbinBot } from '../src/LarbinBot';
import { Configuration } from '../src/Configuration';
import { Mock, Times } from 'moq.ts';
import { LoggerService, TwitchService, YamlService } from '../src/services';
import { ICommand } from '../src/lib/Commands';
import { EventType, IEvent, IEventParams } from '../src/lib/Events';
import { IScheduler } from '../src/lib/Schedulers';

describe('LarbinBot', function () {
  let larbinBot : LarbinBot;
  let mockConfiguration : Mock<Configuration>;
  let mockYamlService : Mock<YamlService>;
  let mockLoggerService : Mock<LoggerService>;
  let mockTwitchService : Mock<TwitchService>;

  beforeEach(() => {
    // Mock
    mockConfiguration = new Mock<Configuration>();
    mockYamlService = new Mock<YamlService>();
    mockLoggerService = new Mock<LoggerService>();
    mockTwitchService = new Mock<TwitchService>();

    const logFunction = (write: string) => {}
    mockLoggerService.setup(x => x.Ascii).returns(logFunction);
    mockLoggerService.setup(x => x.Debug).returns(logFunction);
    mockLoggerService.setup(x => x.Error).returns(logFunction);
    mockLoggerService.setup(x => x.Information).returns(logFunction);
    mockLoggerService.setup(x => x.Warning).returns(logFunction);

    larbinBot = new LarbinBot(
      mockConfiguration.object(),
      mockYamlService.object(),
      mockLoggerService.object(),
      mockTwitchService.object());
  });

  it('Commands', async function () {
    // Arrange
    const numberOfResult = 10;
    const returns = new Array<ICommand>();
    for (let i = 0; i < numberOfResult; i++) {
      const mockCommand = new Mock<ICommand>();
      mockCommand.setup(x => x.Trigger).returns(`!${i}`);
      mockCommand.setup(x => x.OnlyMods).returns(false);
      mockCommand.setup(x => x.Action).returns(() => {});
      returns.push(mockCommand.object());
    }
    mockYamlService.setup(x => x.getCommands()).returns(returns);
    mockYamlService.setup(x => x.getEvents()).returns(new Array());
    mockYamlService.setup(x => x.getSchedulers()).returns(new Array());
    mockTwitchService.setup(x => x.AddCommand).returns(() => { return mockTwitchService.object() });
    mockTwitchService.setup(x => x.Listen).returns(() => {});

    // Act
    larbinBot.Run();

    // Assert
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getEvents, Times.Once());

    mockTwitchService.verify(x => x.AddCommand, Times.Exactly(numberOfResult));
    mockTwitchService.verify(x => x.AddEvent, Times.Never());
    mockTwitchService.verify(x => x.AddScheduler, Times.Never());
  });

  it('Events', async function () {
    // Arrange
    const numberOfResult = 10;
    const returns = new Array<IEvent<IEventParams>>();
    for (let i = 0; i < numberOfResult; i++) {
      const mockCommand = new Mock<IEvent<IEventParams>>();
      mockCommand.setup(x => x.Type).returns(EventType.JOIN);
      mockCommand.setup(x => x.Action).returns(() => {});
      returns.push(mockCommand.object());
    }
    mockYamlService.setup(x => x.getCommands()).returns(new Array());
    mockYamlService.setup(x => x.getEvents()).returns(returns);
    mockYamlService.setup(x => x.getSchedulers()).returns(new Array());
    mockTwitchService.setup(x => x.AddEvent).returns(() => { return mockTwitchService.object() });
    mockTwitchService.setup(x => x.Listen).returns(() => {});

    // Act
    larbinBot.Run();

    // Assert
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getEvents, Times.Once());

    mockTwitchService.verify(x => x.AddCommand, Times.Never());
    mockTwitchService.verify(x => x.AddEvent, Times.Exactly(numberOfResult));
    mockTwitchService.verify(x => x.AddScheduler, Times.Never());
  });

  it('Schedulers', async function () {
    // Arrange
    const numberOfResult = 10;
    const returns = new Array<IScheduler>();
    for (let i = 0; i < numberOfResult; i++) {
      const mockCommand = new Mock<IScheduler>();
      mockCommand.setup(x => x.Id).returns(i.toString());
      mockCommand.setup(x => x.Minutes).returns(i);
      mockCommand.setup(x => x.Action).returns(() => {});
      returns.push(mockCommand.object());
    }
    mockYamlService.setup(x => x.getCommands()).returns(new Array());
    mockYamlService.setup(x => x.getEvents()).returns(new Array());
    mockYamlService.setup(x => x.getSchedulers()).returns(returns);
    mockTwitchService.setup(x => x.AddScheduler).returns(() => { return mockTwitchService.object() });
    mockTwitchService.setup(x => x.Listen).returns(() => {});

    // Act
    larbinBot.Run();

    // Assert
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getCommands, Times.Once());
    mockYamlService.verify(x => x.getEvents, Times.Once());

    mockTwitchService.verify(x => x.AddCommand, Times.Never());
    mockTwitchService.verify(x => x.AddEvent, Times.Never());
    mockTwitchService.verify(x => x.AddScheduler, Times.Exactly(numberOfResult));
  });
});
