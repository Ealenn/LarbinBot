import { inject, injectable } from "tsyringe";
import { IConfiguration } from "./Configuration";
import { WriterCommand } from "./lib/Commands/WriterCommand";
import { WriterScheduler } from "./lib/Schedulers/WriterScheduler";
import { ILoggerService } from "./services/LoggerService";
import { ITwitchService } from "./services/TwitchService";
import { IYamlService } from "./services/YamlService";

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
    commands.forEach((command: WriterCommand) => {
      this._twitchService.AddCommand(command);
      this._loggerService.Debug(`Command ${command.Trigger} Added.`);
    });

    // Schedulers
    const schedulers = this._yamlService.getSchedulers();
    schedulers.forEach((scheduler: WriterScheduler) => {
      this._twitchService.AddScheduler(scheduler);
      this._loggerService.Debug(`Scheduler ${scheduler.Id} every ${scheduler.Minutes} minutes Added.`);
    });

    // Start
    this._twitchService.Listen();
  }
}
