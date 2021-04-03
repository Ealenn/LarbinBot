import { EventType, IEvent, IEventParams } from '.';
import Handlebars from 'handlebars';
import { ITwitchService } from '../../services/TwitchService';

export class RoundRobinMessageEvent<T extends IEventParams> implements IEvent<T> {
  public Type: EventType;
  private _messages: Array<string>;
  private _messageIndex = 0;

  constructor(type: EventType, messages: Array<string>)
  {
    this.Type = type;
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

  public Action(twitchService: ITwitchService, params: T): void {
    const message = this.getMessage();
    const Template = Handlebars.compile(message);
    twitchService.Write(
      Template(params)
    );
  }
}
