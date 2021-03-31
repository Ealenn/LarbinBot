import { singleton } from 'tsyringe';

/**
 * App Configuration
 */
export class AppConfiguration {
  public Debug: boolean;
  public ConfigurationPath: string;
  public ConfigurationFile: string;
}

/**
 * Twitch Configuration
 */
export class TwitchConfiguration {
  public Username: string;
  public Password: string;
  public Channel: string;
}

/**
 * Provide Configuration
 */
export interface IConfiguration {
  App: AppConfiguration;
  Twitch: TwitchConfiguration;
}

@singleton()
export class Configuration implements IConfiguration {
  public App: AppConfiguration;
  public Twitch: TwitchConfiguration;

  constructor() {
    // Application
    this.App = {
      Debug: process.env.DEBUG?.toLocaleLowerCase() == 'true' ?? false,
      ConfigurationPath: process.env.LARBIN_FILE as string || __dirname,
      ConfigurationFile: 'larbin.yml'
    };

    // Twitch
    this.Twitch = {
      Username: process.env.TWITCH_USERNAME as string || '',
      Password: process.env.TWITCH_PASSWORD as string || '',
      Channel: process.env.TWITCH_CHANNEL as string || ''
    };
  }
}
