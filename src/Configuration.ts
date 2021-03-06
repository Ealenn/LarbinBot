import { singleton } from 'tsyringe';

/**
 * App Configuration
 */
export class AppConfiguration {
  public Debug: boolean;
  public ConfigurationPath: string;
  public ConfigurationFile: string;
  public ThresholdInSeconds: number;
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
      ConfigurationFile: 'larbin.yml',
      ThresholdInSeconds: Number.parseInt(process.env.LARBIN_THRESHOLD as string || '5')
    };

    // Twitch
    this.Twitch = {
      Username: process.env.LARBIN_TWITCH_USERNAME as string || '',
      Password: process.env.LARBIN_TWITCH_PASSWORD as string || '',
      Channel: process.env.LARBIN_TWITCH_CHANNEL as string || ''
    };
  }
}
