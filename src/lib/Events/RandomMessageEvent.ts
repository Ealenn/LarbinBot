import { EventType, IEvent, IEventParams } from '.';
import Handlebars from 'handlebars';
import { ITwitchService } from '../../services/TwitchService';

export class RandomMessageEvent<T extends IEventParams> implements IEvent<T> {
  public Type: EventType;
  private _messages: Array<string>;

  constructor(type: EventType, messages: Array<string>)
  {
    this.Type = type;
    this._messages = messages;
  }

  protected getMessage() : string {
    return this._messages[Math.floor(Math.random() * this._messages.length)];
  }

  public Action(twitchService: ITwitchService, params: T): void {
    const message = this.getMessage();
    const Template = Handlebars.compile(message);
    twitchService.Write(
      Template(params)
    );
  }
}
