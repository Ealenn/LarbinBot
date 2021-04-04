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
      Policies.Mod = isUserMod;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction({
        mod: isUserMod
      });

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true, true);
    _testMods(true, false, false);
  });

  it('CanAction - Admin', async function () {
    const _testMods = (isOnlyAdmin: boolean, isUserAdmin: boolean, expectResult: boolean) => {
      // Arrange
      const Trigger = '!trigger';
      const Policies = new CommandPolicies();
      Policies.Admin = isUserAdmin;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction(isUserAdmin ? {
        badges: {
          broadcaster: '1'
        }
      }: {});

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true, true);
    _testMods(true, false, false);
  });

  it('CanAction - VIP', async function () {
    const _testMods = (isOnlyVip: boolean, isUserVip: boolean, expectResult: boolean) => {
      // Arrange
      const Trigger = '!trigger';
      const Policies = new CommandPolicies();
      Policies.Vip = isUserVip;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction(isUserVip ? {
        badges: {
          vip: '1'
        }
      }: {});

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true, true);
    _testMods(true, false, false);
  });

  it('CanAction - Sub', async function () {
    const _testMods = (isOnlySub: boolean, isUserSub: boolean, expectResult: boolean) => {
      // Arrange
      const Trigger = '!trigger';
      const Policies = new CommandPolicies();
      Policies.Sub = isUserSub;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction(isUserSub ? {
        subscriber: true
      }: {});

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true, true);
    _testMods(true, false, false);
  });

  it('CanAction - Others', async function () {
    const _testMods = (others: boolean, expectResult: boolean) => {
      // Arrange
      const Trigger = '!trigger';
      const Policies = new CommandPolicies();
      Policies.Others = others;
      const command = new SampleCommand(Trigger, Policies);

      // Act
      const result = command.CanAction({});

      // Assert
      expect(result).toBe(expectResult);
    };

    _testMods(true, true);
    _testMods(false, false);
  });
});
