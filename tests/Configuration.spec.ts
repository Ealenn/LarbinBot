import "reflect-metadata"
import { AppConfiguration, Configuration, TwitchConfiguration } from "../src/Configuration";

describe('Configuration', function () {

  it('App - With environment', async function () {
    // Arrange
    process.env.DEBUG = 'true';
    process.env.LARBIN_FILE = '/tmp/example';

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.App).toStrictEqual({
      Debug: true,
      ConfigurationPath: '/tmp/example',
      ConfigurationFile: 'larbin.yml'
    } as AppConfiguration);
  });

  it('App - Without environment', async function () {
    // Arrange
    delete process.env.DEBUG;
    delete process.env.LARBIN_FILE;

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.App.ConfigurationPath).toBeDefined();
    expect(configuration.App.ConfigurationPath.length).toBeGreaterThan(1);
    expect(configuration.App).toStrictEqual({
      Debug: false,
      ConfigurationPath: configuration.App.ConfigurationPath,
      ConfigurationFile: 'larbin.yml'
    } as AppConfiguration);
  });

  it('Twitch - With environment', async function () {
    // Arrange
    process.env.LARBIN_TWITCH_USERNAME = 'John';
    process.env.LARBIN_TWITCH_PASSWORD = 'Smith';
    process.env.LARBIN_TWITCH_CHANNEL = 'Twitch'

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.Twitch).toStrictEqual({
      Username: 'John',
      Password: 'Smith',
      Channel: 'Twitch'
    } as TwitchConfiguration);
  });

  it('Twitch - Without environment', async function () {
    // Arrange
    delete process.env.LARBIN_TWITCH_USERNAME;
    delete process.env.LARBIN_TWITCH_PASSWORD;
    delete process.env.LARBIN_TWITCH_CHANNEL;

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.Twitch).toStrictEqual({
      Username: '',
      Password: '',
      Channel: ''
    } as TwitchConfiguration);
  });
});
