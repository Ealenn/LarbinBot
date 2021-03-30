import { IScheduler } from ".";
import { ITwitchService } from "../../services/TwitchService";

/**
 * Simple Writer Scheduler
 */
export class WriterScheduler implements IScheduler {
  private _id: string;
  public get Id(): string {
    return this._id;
  }
  private _minutes: number;
  public get Minutes(): number {
    return this._minutes;
  }
  private _messages: Array<string>;
  private _messageIndex = 0;

  constructor(
    id: string,
    minutes: number,
    messages: Array<string>) {
      this._id = id;
      this._minutes = minutes;
      this._messages = messages;
  }

  private getMessage(): string {
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
