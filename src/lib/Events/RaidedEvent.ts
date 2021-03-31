import { EventType, IEvent, IEventParams } from '.';
import { ITwitchService } from '../../services/TwitchService';
import Handlebars from 'handlebars';

export class RaidedEventParams implements IEventParams {
  Channel: string;
  Username: string;
  Viewers: number;
}

export class RaidedEvent implements IEvent<RaidedEventParams> {
  public Type = EventType.RAIDED;
  private _message: string;

  constructor(message: string)
  {
    this._message = message;
  }

  public Action(twitchService: ITwitchService, params: RaidedEventParams): void {
    const Template = Handlebars.compile(this._message);
    twitchService.Write(
      Template(params)
    );
  }
}
