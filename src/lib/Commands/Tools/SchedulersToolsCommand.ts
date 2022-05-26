import { BaseCommand, CommandPolicies } from '../';
import { Configuration } from '../../../Configuration';
import { ITwitchService } from '../../../services/TwitchService';

/**
 * Schedulers Tools Command
 */
export class SchedulersToolsCommand extends BaseCommand {
  private _configuration: Configuration;
  private _argOn: string;
  private _argOff: string;
  private _argStatus: string;

  constructor(
    trigger: string,
    policies: CommandPolicies,
    configuration: Configuration,
    argOn: string,
    argOff: string,
    argStatus: string)
  {
    super(trigger, policies);
    this._configuration = configuration;
    this._argOn = argOn;
    this._argOff = argOff;
    this._argStatus = argStatus;
  }

  public async Action(twitchService: ITwitchService, fullText: string): Promise<void> {
    const command = fullText.split(' ');
    if (command.length !== 2){
      return;
    }

    switch(command[1]) {
    case this._argStatus:
      this._statusAction(twitchService);
      break;
    case this._argOn:
      this._onAction(twitchService);
      break;
    case this._argOff:
      this._offAction(twitchService);
      break;
    }
  }

  protected _statusAction(twitchService: ITwitchService): void {
    const status = twitchService.StatusSchedulers();
    twitchService.Write(`The schedulers is ${status ? 'ON' : 'OFF'}`);
  }

  protected _onAction(twitchService: ITwitchService): void {
    twitchService.StartSchedulers();
    this._statusAction(twitchService);
  }

  protected _offAction(twitchService: ITwitchService): void {
    twitchService.StopSchedulers();
    this._statusAction(twitchService);
  }
}
