import { EventType, IEventParams, ResubEventParams } from '../lib/Events';
import { JoinEventParams, RaidedEventParams, SubMysteryGiftEventParams, SubscriptionEventParams } from '../lib/Events';

/**
 * Convert tmi.js args to EventTypeParams T
 * https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md
 * @param eventType 
 * @param args 
 * @returns T
 */
export function EventTypeParamsMapper<T extends IEventParams>(eventType: EventType, args: any[]): T {
  let params = {
    Channel: args[0] as string
  };

  switch (eventType) {
  case EventType.JOIN:
    params = Object.assign(params, {
      Username: args[1] as string
    } as JoinEventParams);
    break;
  case EventType.RAIDED:
    params = Object.assign(params, {
      Username: args[1] as string,
      Viewers: args[2] as number
    } as RaidedEventParams);
    break;
  case EventType.RESUB:
    params = Object.assign(params, {
      Username: args[1],
      Months: args[2],
      Message: args[3]
    }) as ResubEventParams;
    break;
  case EventType.SUBGIFT:
    params = Object.assign(params, {
      Username: args[1],
      StreakMonths: args[2],
      RecipientUsername: args[3],
      GiftCount: args[5]['msg-param-sender-count']
    });
    break;
  case EventType.SUBMYSTERYGIFT:
    params = Object.assign(params, {
      Username: args[1],
      OfferedSubs: args[2],
      GiftCount: args[3]
    }) as SubMysteryGiftEventParams;
    break;
  case EventType.SUBSCRIPTION:
    params = Object.assign(params, {
      Username: args[1],
      Message: args[3]
    } as SubscriptionEventParams);
    break;
  }

  return params as T;
}
