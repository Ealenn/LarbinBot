import "reflect-metadata"
import { AppConfiguration, Configuration, TwitchConfiguration } from "../src/Configuration";

describe('Configuration', () => {

  it('App - With environment', async () => {
    // Arrange
    process.env.DEBUG = 'true';
    process.env.LARBIN_FILE = '/tmp/example';
    process.env.LARBIN_THRESHOLD = '10';

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.App).toStrictEqual({
      Debug: true,
      ConfigurationPath: '/tmp/example',
      ConfigurationFile: 'larbin.yml',
      ThresholdInSeconds: 10
    } as AppConfiguration);
  });

  it('App - Without environment', async () => {
    // Arrange
    delete process.env.DEBUG;
    delete process.env.LARBIN_FILE;
    delete process.env.LARBIN_THRESHOLD;

    // Act
    const configuration = new Configuration();

    // Assert
    expect(configuration.App.ConfigurationPath).toBeDefined();
    expect(configuration.App.ConfigurationPath.length).toBeGreaterThan(1);
    expect(configuration.App).toStrictEqual({
      Debug: false,
      ConfigurationPath: configuration.App.ConfigurationPath,
      ConfigurationFile: 'larbin.yml',
      ThresholdInSeconds: 5
    } as AppConfiguration);
  });

  it('Twitch - With environment', async () => {
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

  it('Twitch - Without environment', async () => {
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
