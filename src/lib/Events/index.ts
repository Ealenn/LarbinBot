import { ITwitchService } from '../../services/TwitchService';

/**
 * Event Type
 */
export enum EventType {
  RAIDED = 'raided',
  JOIN = 'join',
  RESUB = 'resub',
  SUBMYSTERYGIFT = 'submysterygift',
  SUBGIFT = 'subgift',
  SUBSCRIPTION = 'subscription'
}

/**
 * Base Event
 */
export interface IEvent<T extends IEventParams>  {
  Type: EventType;
  Action(twitchService: ITwitchService, params: T): void;
}

/**
 * Event Params
 */
export interface IEventParams {
  Channel: string;
}

export class RaidedEventParams implements IEventParams {
  Channel: string;
  Username: string;
  Viewers: number;
}

export class JoinEventParams implements IEventParams {
  Channel: string;
  Username: string;
}

/**
 * Events
 */
export * from './RandomMessageEvent';
