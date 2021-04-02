import { EventType, IEventParams } from '../lib/Events';
import { JoinEventParams, RaidedEventParams } from '../lib/Events';

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
      // TODO: Write params here
    });
    break;
  case EventType.SUBGIFT:
    params = Object.assign(params, {
      // TODO: Write params here
    });
    break;
  case EventType.SUBMYSTERYGIFT:
    params = Object.assign(params, {
      // TODO: Write params here
    });
    break;
  case EventType.SUBSCRIPTION:
    params = Object.assign(params, {
      // TODO: Write params here
    });
    break;
  }

  return params as T;
}
