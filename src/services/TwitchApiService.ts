/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'tmi.js';
import axios, { AxiosInstance } from 'axios';

export interface ITwitchApiService {
  isOnlineStream(): Promise<boolean>;
}

/**
 * Twitch API Client
 * https://dev.twitch.tv/docs/api/
 * https://dev.twitch.tv/docs/authentication/
 */
export class TwitchApiService implements ITwitchApiService {
  private _client: Client;
  private _axios: AxiosInstance;
  constructor(client: Client) {
    this._client = client;
    this._axios = axios.create({
      baseURL: `https://api.twitch.tv/${this._client.getChannels()[0]}`, // TODO: Multi Channels
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: `OIDC ${this._client.getOptions().identity?.password}`
      },
    });
  }

  public async isOnlineStream(): Promise<boolean> {
    const { data } = await this._axios.get(`/channels/${this._client.getChannels()[0]}`);
    console.log(data);
    return data != null;
  }
}
