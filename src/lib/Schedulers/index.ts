import { ITwitchService } from '../../services/TwitchService';

/**
 * Base Scheduler
 */
export interface IScheduler {
  Id: string;
  Minutes: number;
  Action(twitchService: ITwitchService): void;
}

/**
 * Schedulers
 */
export * from './RoundRobinScheduler';
