import { BaseCommand, CommandPolicies } from '..';
import { ITwitchService } from '../../../services/TwitchService';
import { REST as Discord } from '@discordjs/rest';
import { Configuration } from '../../../Configuration';

/**
 * Discord Command
 */
export class DiscordCommand extends BaseCommand {
  protected _discordClient: Discord;
  protected _configuration: Configuration;

  private _argChannelId: string;

  constructor(
    trigger: string,
    policies: CommandPolicies,
    configuration: Configuration,
    argChannelId: string)
  {
    super(trigger, policies);
    this._configuration = configuration;

    this._argChannelId = argChannelId;

    this._discordClient = new Discord({ version: '9' });
    if (configuration.Discord.Token) {
      this._discordClient.setToken(configuration.Discord.Token);
    }
  }

  public async Action(twitchService: ITwitchService, fullText: string, userstate: any): Promise<void> {
    if (!this._configuration.Discord.Token) {
      twitchService.Write(`Sorry @${userstate.username}, I don't have access to Discord`);
    }

    const body = fullText.slice(this._trigger.length + 1);
    const message = this._replaceWithVariables(body, {
      Channel: this._configuration.Twitch.Channel
    }).trim();

    await this._discordClient.post(`/channels/${this._argChannelId}/messages`, {
      body: {
        content: message
      }
    })
    twitchService.Write(`@${userstate.username} just shared : ${message}`);
  }
}
