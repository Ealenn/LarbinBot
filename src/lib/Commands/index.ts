import { ChatUserstate } from "tmi.js";
import { ITwitchService } from "../../services/TwitchService";

export interface ICommand {
  Trigger: string;
  Action(twitchService: ITwitchService, state: ChatUserstate): void;
}
