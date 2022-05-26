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
 * Twitter Configuration
 */
export class TwitterConfiguration {
  Token?: string;
}

/**
 * Discord Configuration
 */
export class DiscordConfiguration {
  Token?: string;
}

/**
 * Provide Configuration
 */
export interface IConfiguration {
  App: AppConfiguration;
  Twitch: TwitchConfiguration;
  Twitter: TwitterConfiguration;
  Discord: DiscordConfiguration;
}

@singleton()
export class Configuration implements IConfiguration {
  public App: AppConfiguration;
  public Twitch: TwitchConfiguration;
  public Twitter: TwitterConfiguration;
  public Discord: DiscordConfiguration;

  constructor() {
    // Application
    this.App = {
      Debug: process.env.DEBUG?.toLocaleLowerCase() == 'true' ?? false,
      ConfigurationPath: process.env.LARBIN_FILE || __dirname,
      ConfigurationFile: 'larbin.yml',
      ThresholdInSeconds: Number.parseInt(process.env.LARBIN_THRESHOLD || '5')
    };

    // Twitch
    this.Twitch = {
      Username: process.env.LARBIN_TWITCH_USERNAME || '',
      Password: process.env.LARBIN_TWITCH_PASSWORD || '',
      Channel: process.env.LARBIN_TWITCH_CHANNEL || ''
    };

    // Twitter
    this.Twitter = {
      Token: process.env.LARBIN_TWITTER_TOKEN
    };

    // Discord
    this.Discord = {
      Token: process.env.LARBIN_DISCORD_TOKEN
    };
  }
}
