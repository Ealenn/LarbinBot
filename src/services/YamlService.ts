import { inject, singleton } from 'tsyringe';
import { IConfiguration } from '../Configuration';
import YAML from 'yaml';
import FS from 'fs';
import Path from 'path';
import { WriterCommand } from '../lib/Commands';
import { ILoggerService } from './LoggerService';
import { EventType, IEvent, IEventParams } from '../lib/Events';
import { JoinEventParams, RaidedEventParams, RandomMessageEvent } from '../lib/Events';
import { IScheduler, RoundRobinScheduler } from '../lib/Schedulers';

/**
 * Provides tools for Yaml validation/parser
 */
export interface IYamlService {
  getCommands(): Array<WriterCommand>;
  getSchedulers(): Array<IScheduler>;
  getEvents(): Array<IEvent<IEventParams>>;
}

@singleton()
export class YamlService implements IYamlService {
  private _loggerService: ILoggerService;
  private _yamlContent: any;
  private _configuration: IConfiguration;

  constructor(
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('IConfiguration') configuration: IConfiguration
  ) {
    this._loggerService = loggerService;
    this._configuration = configuration;
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

  public getCommands(): Array<WriterCommand> {
    const yamlContent = this.getYamlContent();
    const commands = new Array<WriterCommand>();

    if (!yamlContent || !yamlContent.commands) {
      return commands;
    }

    yamlContent.commands.forEach(function (element: any) {
      if (element.name && element.message) {
        commands.push(new WriterCommand(element.name, element.message));
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
        const id = Math.floor(
          Math.random() * (9999999 - 1111111) + 1111111
        );
        schedulers.push(new RoundRobinScheduler(`${element.id}#${id}`, element.minutes, element.messages));
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
        switch (element.name) {
        case EventType.RAIDED:
          events.push(new RandomMessageEvent<RaidedEventParams>(element.name, element.messages));
          break;
        case EventType.JOIN:
          events.push(new RandomMessageEvent<JoinEventParams>(element.name, element.messages));
          break;
        }
      }
    });

    return events;
  }
}
