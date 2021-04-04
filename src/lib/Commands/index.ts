import { ChatUserstate, Userstate } from 'tmi.js';
import { Configuration } from '../../Configuration';
import { ITwitchService } from '../../services/TwitchService';

/**
 * Policies Command 
 */
export class CommandPolicies {
  Others = false;
  Mod = false;
  Admin = false;
  Sub = false;
  Vip = false;
}

/**
 * Base Command
 */
export interface ICommand {
  Trigger: string;
  Policies: CommandPolicies;
  Action(twitchService: ITwitchService, fullMessage: string, state: ChatUserstate): void;
  CanAction(userState: Userstate, configuration: Configuration): boolean;
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
    if (this._policies.Sub && userState.subscriber) {
      return true;
    }
    if (this._policies.Vip && userState.badges?.vip) {
      return true;
    }
    if (this._policies.Mod && userState.mod) {
      return true;
    }
    if (this._policies.Admin && (userState.badges?.admin != null || userState.badges?.broadcaster != null)) {
      return true;
    }
    if (this.Policies.Others) {
      return this.Policies.Others;
    }
    return false;
  }
}

/**
 * Commands
 */
export * from './RandomMessageCommand';
export * from './RoundRobinMessageCommand';
