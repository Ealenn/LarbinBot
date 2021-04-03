import { IScheduler } from '.';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Round Robin Scheduler
 */
export class RandomScheduler implements IScheduler {
  private _id: string;
  public get Id(): string {
    return this._id;
  }
  private _minutes: number;
  public get Minutes(): number {
    return this._minutes;
  }
  private _messages: Array<string>;

  constructor(
    id: string,
    minutes: number,
    messages: Array<string>)
  {
    this._id = id;
    this._minutes = minutes;
    this._messages = messages;
  }

  protected getMessage() : string {
    return this._messages[Math.floor(Math.random() * this._messages.length)];
  }

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this.getMessage());
  }
}
