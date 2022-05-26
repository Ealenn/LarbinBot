import { EventType } from '../Events';

export class YamlFile {
  constructor(
    public tools?: any,
    public socials?: any,
    public commands = new Array<YamlCommand>(),
    public schedulers = new Array<YamlScheduler>(),
    public events = new Array<YamlEvent>(),
  ){
  }
}

export class YamlPolicies {
  constructor(
    public admin = false,
    public mod = false,
    public vip = false,
    public sub = false,
    public others = false
  ) {
  }
}

export class YamlCommand {
  constructor(
    public name: string,
    public random: boolean,
    public policies: YamlPolicies,
    public messages = new Array<string>()
  ){
  }
}

export class YamlScheduler {
  constructor(
    public id: string,
    public minutes: number,
    public random: boolean,
    public messages = new Array<string>()
  ) {
  }
}

export class YamlEvent {
  constructor(
    public name: EventType,
    public messages = new Array<string>()
  ) {
  }
}
