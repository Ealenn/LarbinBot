import { Client, Options } from 'tmi.js'
import { inject, singleton } from 'tsyringe';
import { IConfiguration } from '../Configuration';
import { ICommand } from '../lib/Commands';
import { IEvent, IEventParams } from '../lib/Events';
import { IScheduler } from '../lib/Schedulers';
import { EventTypeParamsMapper } from '../mappers/EventTypeParamsMapper';
import { ILoggerService } from '.';

/**
 * Provides all twitch tools 
 */
export interface ITwitchService {
  Write(message: string): void;
  AddCommand(command: ICommand): ITwitchService;
  AddScheduler(scheduler: IScheduler): ITwitchService;
  AddEvent<T extends IEventParams>(event: IEvent<T>): ITwitchService;
  Listen(): void;
}

@singleton()
export class TwitchService implements ITwitchService {
  private _commands: Array<ICommand> = new Array<ICommand>();
  private _loggerService: ILoggerService;
  private _configuration: IConfiguration;
  private _client: Client;

  constructor(
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('IConfiguration') configuration: IConfiguration
  ) {
    this._loggerService = loggerService;
    this._configuration = configuration;
    const twitchOptions = {
      options: { debug: this._configuration.App.Debug },
      connection: {
        reconnect: true,
        secure: true
      },
      identity: {
        username: this._configuration.Twitch.Username,
        password: this._configuration.Twitch.Password
      },
      channels: [this._configuration.Twitch.Channel],
      logger: {
        error: this._loggerService.Error,
        info: this._loggerService.Information,
        warn: this._loggerService.Warning
      }
    } as Options;
    this._client = new Client(twitchOptions);
    this._client.connect();
  }

  public Listen(): void {
    this._client.on('message', (channels, userstate, message) => {
      const command = this._commands.find((x) => x.Trigger == message);
      if (command != undefined) {
        if (!command.OnlyMods || (command.OnlyMods && userstate.mod == true)) {
          command.Action(this, userstate);
        }
      }
    });
  }

  public Write(message: string): void {
    this._client.say(this._configuration.Twitch.Channel, message);
  }

  public AddCommand(command: ICommand): ITwitchService {
    this._commands.push(command);
    return this;
  }

  public AddScheduler(scheduler: IScheduler): ITwitchService {
    setInterval((s) => {
      s.Action(this);
    }, scheduler.Minutes * 60000, scheduler);
    return this;
  }

  public AddEvent<T extends IEventParams>(event: IEvent<T>): ITwitchService {
    this._client.on(event.Type, (...args: any[]) => {
      event.Action(this, EventTypeParamsMapper(event.Type, args));
    });
    return this;
  }
}
