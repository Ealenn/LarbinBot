/**
 * Command Stats Model
 */
export interface ICommandStats {
  Count: number;
  LastTrigger: Date;
}

export function GenerateDefaultCommandStats(): ICommandStats {
  return {
    Count: 0,
    LastTrigger: new Date()
  };
}
