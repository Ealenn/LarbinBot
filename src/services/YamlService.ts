import { inject, singleton } from 'tsyringe';
import { IConfiguration } from '../Configuration';
import YAML from 'yaml';
import FS from 'fs';
import Path from 'path';
import { ICommand, RandomMessageCommand, RoundRobinMessageCommand } from '../lib/Commands';
import { ILoggerService, ICryptoService } from '.';
import { IEvent, IEventParams, RandomMessageEvent, RoundRobinMessageEvent } from '../lib/Events';
import { IScheduler, RandomScheduler, RoundRobinScheduler } from '../lib/Schedulers';

/**
 * Provides tools for Yaml validation/parser
 */
export interface IYamlService {
  getCommands(): Array<ICommand>;
  getSchedulers(): Array<IScheduler>;
  getEvents(): Array<IEvent<IEventParams>>;
}

@singleton()
export class YamlService implements IYamlService {
  private _loggerService: ILoggerService;
  private _yamlContent: any;
  private _configuration: IConfiguration;
  private _cryptoService: ICryptoService;

  constructor(
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('ICryptoService') cryptoService: ICryptoService
  ) {
    this._loggerService = loggerService;
    this._configuration = configuration;
    this._cryptoService = cryptoService;
  }

  private getYamlContent(): any {
    if (this._yamlContent) {
      return this._yamlContent;
    }

    const pathToFile = Path.join(this._configuration.App.ConfigurationPath, this._configuration.App.ConfigurationFile);
    if (!FS.existsSync(pathToFile)) {
      this._loggerService.Debug(`Unable to find configuration file on ${pathToFile}`)
      return this._yamlContent;
    }

    const yamlFile = FS.readFileSync(pathToFile).toString();
    const yamlResult = YAML.parse(yamlFile);
    this._yamlContent = yamlResult;
    return this._yamlContent;
  }

  public getCommands(): Array<ICommand> {
    const yamlContent = this.getYamlContent();
    const commands = new Array<ICommand>();

    if (!yamlContent || !yamlContent.commands) {
      return commands;
    }

    yamlContent.commands.forEach(function (element: any) {
      if (element.name && element.message) {
        const onlyMods = element.onlyMods as boolean || false;
        if (element.random) {
          commands.push(new RandomMessageCommand(element.name, onlyMods, element.message));
        } else {
          commands.push(new RoundRobinMessageCommand(element.name, onlyMods, element.message));
        }
      }
    });

    return commands;
  }

  public getSchedulers(): Array<IScheduler> {
    const yamlContent = this.getYamlContent();
    const schedulers = new Array<IScheduler>();

    if (!yamlContent || !yamlContent.schedulers) {
      return schedulers;
    }

    yamlContent.schedulers.forEach((element: any) => {
      if (element.id && element.minutes && element.messages) {
        if (element.random) {
          schedulers.push(new RandomScheduler(`${element.id}#${this._cryptoService.UniqueString(6)}`, element.minutes, element.messages));
        } else {
          schedulers.push(new RoundRobinScheduler(`${element.id}#${this._cryptoService.UniqueString(6)}`, element.minutes, element.messages));
        }
      }
    });

    return schedulers;
  }

  public getEvents(): Array<IEvent<IEventParams>> {
    const yamlContent = this.getYamlContent();
    const events = new Array<IEvent<IEventParams>>();

    if (!yamlContent || !yamlContent.events) {
      return events;
    }

    yamlContent.events.forEach((element: any) => {
      if (element.name && element.messages) {
        if (element.random) {
          events.push(new RandomMessageEvent(element.name, element.messages));
        } else {
          events.push(new RoundRobinMessageEvent(element.name, element.messages));
        }
      }
    });

    return events;
  }
}
