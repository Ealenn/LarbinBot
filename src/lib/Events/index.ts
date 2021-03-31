import { ITwitchService } from '../../services/TwitchService';

export enum EventType {
  RAIDED = 'raided',
  RESUB = 'resub',
  SUBMYSTERYGIFT = 'submysterygift',
  SUBGIFT = 'subgift',
  SUBSCRIPTION = 'subscription'
}

export interface IEvent<T extends IEventParams>  {
  Type: EventType;
  Action(twitchService: ITwitchService, params: T): void;
}

export interface IEventParams {
  Channel: string;
}
