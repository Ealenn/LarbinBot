import { ChatUserstate } from 'tmi.js';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Base Command
 */
export interface ICommand {
  Trigger: string;
  OnlyMods: boolean;
  Action(twitchService: ITwitchService, state: ChatUserstate): void;
}

/**
 * Commands
 */
export * from './RandomMessageCommand';
export * from './RoundRobinMessageCommand';
