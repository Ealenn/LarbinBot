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

export class ResubEventParams implements IEventParams {
  Channel: string;
  Username: string;
  Months: number;
  Message: string;
}

export class SubGiftEventParams implements IEventParams {
  Channel: string;
  Username: string;
  StreakMonths: number;
  RecipientUsername: string;
  GiftCount: number;
}

export class SubMysteryGiftEventParams implements IEventParams {
  Channel: string;
  Username: string;
  OfferedSubs: number;
  GiftCount: number;
}

export class SubscriptionEventParams implements IEventParams {
  Channel: string;
  Username: string;
  Message: string;
}

/**
 * Events
 */
export * from './RandomMessageEvent';
