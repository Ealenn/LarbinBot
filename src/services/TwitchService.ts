import { Client } from 'tmi.js'
import { inject, singleton } from 'tsyringe';
import { IConfiguration } from '../Configuration';
import { ICommand } from '../lib/Commands';
import { IEvent, IEventParams } from '../lib/Events';
import { IScheduler } from '../lib/Schedulers';
import { EventTypeParamsMapper } from '../mappers/EventTypeParamsMapper';
import { ILoggerService } from '.';
import { ITmiFactory } from '../factory/TmiFactory';
import { setInterval, clearInterval } from 'timers';

/**
 * Provides all twitch tools 
 */
export interface ITwitchService {
  Write(message: string): void;
  AddCommand(command: ICommand): ITwitchService;
  AddScheduler(scheduler: IScheduler): ITwitchService;
  StartSchedulers(): void;
  StopSchedulers(): void;
  StatusSchedulers(): boolean;
  AddEvent<T extends IEventParams>(event: IEvent<T>): ITwitchService;
  Listen(): void;
}

@singleton()
export class TwitchService implements ITwitchService {
  private _commands: Array<ICommand> = new Array<ICommand>();
  private _schedulers: Array<IScheduler> = new Array<IScheduler>();
  private _schedulersIntervals: Array<NodeJS.Timeout> = new Array<NodeJS.Timeout>();

  private _loggerService: ILoggerService;
  private _configuration: IConfiguration;
  private _client: Client;

  constructor(
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('ITmiFactory') tmiFactory: ITmiFactory
  ) {
    this._loggerService = loggerService;
    this._configuration = configuration;
    this._client = tmiFactory.Client;
  }

  public Listen(): void {
    this.StartSchedulers();
    this._client.on('message', (channels, userstate, message) => {
      const command = this._commands.find((x) => message.startsWith(x.Trigger));
      if (command != undefined) {
        if (command.CanAction(userstate, this._configuration)) {
          command.Action(this, message, userstate);
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
    this._schedulers.push(scheduler);
    return this;
  }

  public StartSchedulers(): void {
    this.StopSchedulers();
    this._schedulers.forEach((scheduler) => {
      const interval = setInterval((twitchService) => scheduler.Action(twitchService), scheduler.Minutes * 60000, this);
      this._schedulersIntervals.push(interval);
    })
  }

  public StopSchedulers(): void {
    this._schedulersIntervals.forEach((intervalId: NodeJS.Timeout) => {
      clearInterval(intervalId);
    });
    this._schedulersIntervals = new Array<NodeJS.Timeout>();
  }

  public StatusSchedulers(): boolean {
    return this._schedulersIntervals.length > 0;
  }

  public AddEvent<T extends IEventParams>(event: IEvent<T>): ITwitchService {
    this._client.on(event.Type, (...args: any[]) => {
      event.Action(this, EventTypeParamsMapper(event.Type, args));
    });
    return this;
  }
}
