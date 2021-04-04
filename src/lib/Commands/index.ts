import { ChatUserstate, Userstate } from 'tmi.js';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Policies Command 
 */
export class CommandPolicies {
  OnlyMods = false;
}

/**
 * Base Command
 */
export interface ICommand {
  Trigger: string;
  Policies: CommandPolicies;
  Action(twitchService: ITwitchService, fullMessage: string, state: ChatUserstate): void;
  CanAction(userState: Userstate): boolean;
}

export abstract class BaseCommand implements ICommand {
  protected _trigger: string;
  public get Trigger(): string {
    return this._trigger;
  }
  protected _policies: CommandPolicies;
  public get Policies(): CommandPolicies {
    return this._policies;
  }

  constructor(trigger: string, policies: CommandPolicies) {
    this._trigger = trigger;
    this._policies = policies;
  }

  abstract Action(twitchService: ITwitchService, fullMessage: string, userState: ChatUserstate): void;
  public CanAction(userState: Userstate): boolean {
    if (this._policies.OnlyMods && !userState.mod) {
      return false;
    }
    return true;
  }
}

/**
 * Commands
 */
export * from './RandomMessageCommand';
export * from './RoundRobinMessageCommand';
