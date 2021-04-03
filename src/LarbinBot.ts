import { inject, injectable } from 'tsyringe';
import { IConfiguration } from './Configuration';
import { ICommand } from './lib/Commands';
import { IEvent, IEventParams } from './lib/Events';
import { IScheduler } from './lib/Schedulers';
import { ILoggerService, ITwitchService, IYamlService} from './services';

/**
 * Twitch Bot
 */
export interface ILarbinBot {
  Run(): void;
}

@injectable()
export class LarbinBot implements ILarbinBot {
  private _configuration: IConfiguration;
  private _yamlService: IYamlService;
  private _loggerService: ILoggerService;
  private _twitchService: ITwitchService;

  constructor(
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('IYamlService') yamlService: IYamlService,
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('ITwitchService') twitchService: ITwitchService
  ) {
    this._configuration = configuration;
    this._yamlService = yamlService;
    this._loggerService = loggerService;
    this._twitchService = twitchService;
  }

  public Run(): void {
    this._loggerService.Ascii('LarbinBot');
    
    // Commands
    const commands = this._yamlService.getCommands();
    commands.forEach((command: ICommand) => {
      this._twitchService.AddCommand(command);
      this._loggerService.Debug(`Command ${command.Trigger} Added.`);
    });

    // Schedulers
    const schedulers = this._yamlService.getSchedulers();
    schedulers.forEach((scheduler: IScheduler) => {
      this._twitchService.AddScheduler(scheduler);
      this._loggerService.Debug(`Scheduler ${scheduler.Id} every ${scheduler.Minutes} minutes Added.`);
    });

    // Events
    const events = this._yamlService.getEvents();
    events.forEach((event: IEvent<IEventParams>) => {
      this._twitchService.AddEvent(event);
      this._loggerService.Debug(`Event ${event.Type} Added.`);
    });

    // Start
    this._twitchService.Listen();
  }
}
