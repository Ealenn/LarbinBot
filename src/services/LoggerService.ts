import { inject, singleton } from "tsyringe";
import figlet from 'figlet';
import { IConfiguration } from "../Configuration";

/**
 * Console interactions
 */
export interface ILoggerService {
    Ascii(write: string): void;
    Information(write: string): void;
    Debug(write: string): void;
    Error(write: string): void;
}

@singleton()
export class LoggerService implements ILoggerService {
  private _configuration: IConfiguration;

  constructor(@inject('IConfiguration') configuration: IConfiguration) {
    this._configuration = configuration;
  }

  public Ascii(write: string): void {
    const asciiText = figlet.textSync(write, {
      font: 'Standard'
    });
    console.log(asciiText);
  }

  public Information(write: string): void {
    console.info(`[INFO] ${write}`);
  }

  public Debug(write: string): void {
    if (this._configuration.App.Debug){
      console.debug(`[DEBUG] ${write}`);
    }
  }

  public Error(write: string): void {
    console.error(`[ERROR] ${write}`);
  }
}
