/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, singleton } from 'tsyringe';
import { IConfiguration } from '../Configuration';
import YAML from 'yaml';
import FS from 'fs';
import Path from 'path';
import { CommandPolicies, DiscordCommand, ICommand, RandomMessageCommand, RoundRobinMessageCommand, TwitterCommand } from '../lib/Commands';
import { ILoggerService, ICryptoService } from '.';
import { IEvent, IEventParams, RandomMessageEvent, RoundRobinMessageEvent } from '../lib/Events';
import { IScheduler, RandomScheduler, RoundRobinScheduler } from '../lib/Schedulers';
import { SchedulersToolsCommand } from '../lib/Commands/Tools';
import { YamlFile, YamlPolicies } from '../lib/Yaml';

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

  private getYamlContent(): YamlFile {
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

  protected _getCommandPolicies(policies: YamlPolicies): CommandPolicies {
    const defaultPolicies = new CommandPolicies();
    if (!policies) {
      return defaultPolicies;
    }

    return {
      Admin: policies.admin ?? defaultPolicies.Admin,
      Mod: policies.mod ?? defaultPolicies.Mod,
      Vip: policies.vip ?? defaultPolicies.Vip,
      Sub: policies.sub ?? defaultPolicies.Sub,
      Others: policies.others ?? defaultPolicies.Others
    } as CommandPolicies;
  }

  public getCommands(): Array<ICommand> {
    const yamlContent = this.getYamlContent();
    const commands = new Array<ICommand>();

    if (!yamlContent || !yamlContent.commands) {
      return commands;
    }

    yamlContent.commands?.forEach((element: any) => {
      if (element.name && element.messages) {
        if (element.random) {
          commands.push(new RandomMessageCommand(element.name, this._getCommandPolicies(element.policies), element.messages));
        } else {
          commands.push(new RoundRobinMessageCommand(element.name, this._getCommandPolicies(element.policies), element.messages));
        }
      }
    });

    yamlContent.tools?.commands?.forEach((element: any) => {
      if (element.type === 'schedulers' && element.argOn && element.argOff && element.argStatus) {
        commands.push(new SchedulersToolsCommand(
          element.name,
          this._getCommandPolicies(element.policies),
          this._configuration,
          element.argOn,
          element.argOff,
          element.argStatus));
      }
    });

    yamlContent.socials?.commands?.forEach((element: any) => {
      if (element.type === 'twitter') {
        commands.push(new TwitterCommand(
          element.name,
          this._getCommandPolicies(element.policies),
          this._configuration,
          element.argFooter));
      }
      if (element.type === 'discord') {
        commands.push(new DiscordCommand(
          element.name,
          this._getCommandPolicies(element.policies),
          this._configuration,
          element.argChannelId));
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
