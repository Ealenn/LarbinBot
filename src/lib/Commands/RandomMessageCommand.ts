import { BaseCommand, CommandPolicies } from '.';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Random Message Command
 */
export class RandomMessageCommand extends BaseCommand {
  private _messages: Array<string>;

  constructor(
    trigger: string,
    policies: CommandPolicies,
    messages: Array<string>)
  {
    super(trigger, policies);
    this._messages = messages;
  }

  protected getMessage() : string {
    return this._messages[Math.floor(Math.random() * this._messages.length)];
  }

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this.getMessage());
  }
}
