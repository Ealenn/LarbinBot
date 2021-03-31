import 'reflect-metadata';
import { LarbinBot } from './LarbinBot';
import { container } from 'tsyringe';
import { LoggerService } from './services/LoggerService';
import { Configuration } from './Configuration';
import { TwitchService } from './services/TwitchService';
import { YamlService } from './services/YamlService';

/**
 * DI
 */
container
  .register('ILarbinBot', { useClass: LarbinBot })
  .register('ILoggerService', { useClass: LoggerService })
  // Services
  .register('ITwitchService', { useClass: TwitchService })
  // Configuration
  .register('IConfiguration', { useClass: Configuration })
  .register('IYamlService', { useClass: YamlService })

/**
 * APPLICATION
 */
container.resolve(LarbinBot).Run();