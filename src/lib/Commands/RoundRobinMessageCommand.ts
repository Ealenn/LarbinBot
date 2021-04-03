import { ICommand } from '.';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Round Robin Message Command
 */
export class RoundRobinMessageCommand implements ICommand {
  private _trigger: string;
  public get Trigger(): string {
    return this._trigger;
  }
  private _messages: Array<string>;
  private _messageIndex = 0;

  constructor(
    trigger: string,
    messages: Array<string>) 
  {
    this._trigger = trigger;
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

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this.getMessage());
  }
}
