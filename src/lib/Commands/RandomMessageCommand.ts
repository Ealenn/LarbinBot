import { ChatUserstate } from 'tmi.js';
import { BaseCommand, CommandPolicies } from '.';
import { ICommandStats } from '../../services/Model/CommandStats';
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

  public async Action(twitchService: ITwitchService, fullMessage: string, userState: ChatUserstate, stats: ICommandStats): Promise<void> {
    const messageWithStats = this._replaceWithVariables(this.getMessage(), stats);
    twitchService.Write(messageWithStats);
  }
}
