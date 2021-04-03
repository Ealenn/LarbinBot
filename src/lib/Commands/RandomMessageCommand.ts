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
  private _onlyMods: boolean;
  public get OnlyMods(): boolean {
    return this._onlyMods;
  }
  private _messages: Array<string>;

  constructor(
    trigger: string,
    onlyMods: boolean,
    messages: Array<string>) 
  {
    this._trigger = trigger;
    this._onlyMods = onlyMods;
    this._messages = messages;
  }

  protected getMessage() : string {
    return this._messages[Math.floor(Math.random() * this._messages.length)];
  }

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this.getMessage());
  }
}
