import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Command } from '@/lib/Command'

@Module
export class CommandStore extends VuexModule {
  commands = new Array<Command>();

  @Mutation
  public addCommand(command: Command): void {
    const commandIndex = this.commands
      .map(x => x.name)
      .indexOf(command.name);

    if (commandIndex > -1) {
      delete this.commands[commandIndex];
    }

    this.commands.push(command);
  }

  @Mutation
  public removeCommand(name: string): void {
    this.commands = this.commands.filter((element) => {
      return element.name != name
    });
  }
}
