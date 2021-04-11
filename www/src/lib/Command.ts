import { Policies } from "./Policies";

export class Command {
  constructor(
    public name: string,
    public random: boolean,
    public policies: Policies,
    public messages = new Array<string>()
  ){
  }
}
