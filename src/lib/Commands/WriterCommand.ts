import { ICommand } from ".";
import { ITwitchService } from "../../services/TwitchService";

/**
 * Simple Writer Command
 */
export class WriterCommand implements ICommand {
  private _trigger: string;
  public get Trigger(): string {
    return this._trigger;
  }
  private _message: string;

  constructor(
    trigger: string,
    message: string) {
      this._trigger = trigger;
      this._message = message;
  }

  public Action(twitchService: ITwitchService): void {
    twitchService.Write(this._message);
  }
}
