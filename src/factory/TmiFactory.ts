/* istanbul ignore file */
import * as Tmi from 'tmi.js';
import { inject, injectable } from 'tsyringe';
import { Configuration } from '../Configuration';
import { ILoggerService } from '../services';

export interface ITmiFactory {
  Client: Tmi.Client;
}

@injectable()
export class TmiFactory implements ITmiFactory {
  private _client: Tmi.Client;
  public get Client(): Tmi.Client {
    return this._client;
  }

  constructor(
    @inject('IConfiguration') configuration: Configuration,
    @inject('ILoggerService') loggerService: ILoggerService
  ) {
    this._client = new Tmi.Client(TmiFactory.getOptions(configuration, loggerService));
    this._client.connect();
  }

  public static getOptions(configuration: Configuration, loggerService: ILoggerService) : Tmi.Options {
    return {
      options: { debug: configuration.App.Debug },
      connection: {
        reconnect: true,
        secure: true
      },
      identity: {
        username: configuration.Twitch.Username,
        password: configuration.Twitch.Password
      },
      channels: [configuration.Twitch.Channel],
      logger: {
        error: loggerService.Error,
        info: loggerService.Information,
        warn: loggerService.Warning
      }
    } as Tmi.Options;
  }
}
