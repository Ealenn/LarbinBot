import { ICommand } from '.';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Random Message Command
 */
export class RandomMessageCommand implements ICommand {
  private _trigger: string;
  public get Trigger(): string {
    return this._trigger;
  }
  private _messages: Array<string>;

  constructor(
    trigger: string,
    messages: Array<string>) 
  {
    this._trigger = trigger;
    this._messages = messages;
  }

  protected getMessage() : string {
    return this._messages[Math.floor(Math.random() * this._messages.length)];
  }

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this.getMessage());
  }
}
