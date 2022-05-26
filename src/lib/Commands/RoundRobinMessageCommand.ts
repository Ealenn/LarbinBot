import { ChatUserstate } from 'tmi.js';
import { BaseCommand, CommandPolicies } from '.';
import { ICommandStats } from '../../services/Model/CommandStats';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Round Robin Message Command
 */
export class RoundRobinMessageCommand extends BaseCommand {
  private _messages: Array<string>;
  private _messageIndex = 0;

  constructor(
    trigger: string,
    policies: CommandPolicies,
    messages: Array<string>)
  {
    super(trigger, policies);
    this._messages = messages;
  }

  protected getMessage(): string {
    const message = this._messages[this._messageIndex];
    this._messageIndex = this._messageIndex + 1;
    if (this._messageIndex >= this._messages.length) {
      this._messageIndex = 0;
    }
    return message;
  }

  public async Action(twitchService: ITwitchService, fullMessage: string, userState: ChatUserstate, stats: ICommandStats): Promise<void> {
    const messageWithStats = this._replaceWithVariables(this.getMessage(), stats);
    twitchService.Write(messageWithStats);
  }
}
