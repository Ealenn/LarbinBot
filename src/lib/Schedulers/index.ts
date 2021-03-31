import { ITwitchService } from '../../services/TwitchService';

export interface IScheduler {
  Id: string;
  Minutes: number;
  Action(twitchService: ITwitchService): void;
}
