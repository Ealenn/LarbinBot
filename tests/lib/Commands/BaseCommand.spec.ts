import 'reflect-metadata'
import { BaseCommand, CommandPolicies, RandomMessageCommand } from '../../../src/lib/Commands';

class SampleCommand extends BaseCommand {
  constructor(
    trigger: string,
    policies: CommandPolicies)
  {
    super(trigger, policies);
  }

  public Action(): void {}
}

describe('Commands - BaseCommand', function () {

  it('Properties', async function () {
    // Arrange
    const Trigger = '!trigger';
    const Policies = new CommandPolicies();
    const command = new SampleCommand(Trigger, Policies);

    // Act

    // Assert
    expect(command.Trigger).toBe(Trigger);
    expect(command.Policies).toBe(Policies);
  });

  it('CanAction - Mods', async function () {
    const _testMods = (isOnlyMod: boolean, isUserMod: boolean, expectResult: boolean) => {
      // Arrange
      const Trigger = '!trigger';
      const Policies = new CommandPolicies();
      Policies.OnlyMods = isOnlyMod;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction({
        mod: isUserMod
      });

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true, true);
    _testMods(false, true, true);

    _testMods(true, true, true);
    _testMods(true, false, false);
  });
});
