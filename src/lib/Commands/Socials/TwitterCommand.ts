import { BaseCommand, CommandPolicies } from '../';
import { ITwitchService } from '../../../services/TwitchService';
import { TwitterApi } from 'twitter-api-v2';
import { Configuration } from '../../../Configuration';

/**
 * Twitter Command
 */
export class TwitterCommand extends BaseCommand {
  protected _twitterClient: TwitterApi;
  protected _configuration: Configuration;

  protected _argFooter: string;

  constructor(
    trigger: string,
    policies: CommandPolicies,
    configuration: Configuration,
    argFooter: string)
  {
    super(trigger, policies);
    this._configuration = configuration;

    this._argFooter = argFooter;

    if (configuration.Twitter.Token) {
      this._twitterClient = new TwitterApi(configuration.Twitter.Token);
    }
  }

  public async Action(twitchService: ITwitchService, fullText: string, userstate: any): Promise<void> {
    if (!this._twitterClient) {
      twitchService.Write(`Sorry @${userstate.username}, I don't have access to twitter`);
      return;
    }

    const body = fullText.slice(this._trigger.length + 1);
    const tweet = this._replaceWithVariables(`${body} ${this._argFooter}`, {
      Channel: this._configuration.Twitch.Channel
    }).trim();

    if (tweet.length > 280) {
      twitchService.Write(`@${userstate.username} The tweet is too long (${tweet.length}/280)`);
      return;
    }

    await this._twitterClient.v2.tweet({
      text: tweet
    });
    twitchService.Write(`@${userstate.username} just tweeted : ${tweet}`);
  }
}
