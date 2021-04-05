# LarbinBot

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/LarbinBot?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/LarbinBot)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/LarbinBot?style=for-the-badge&logo=github)](https://github.com/Ealenn/LarbinBot/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/LarbinBot?style=for-the-badge&logo=github)](https://github.com/Ealenn/LarbinBot/issues)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ealenn/LarbinBot?style=for-the-badge)
![Docker Pulls](https://img.shields.io/docker/pulls/ealen/larbinbot?style=for-the-badge)

Completely customizable Twitch Bot. 

## Version

The versioning scheme we use is [SemVer](http://semver.org/).

``` yml
- lastest: Master Build
- x.x.x: Release version x.x.x
- snapshot: Pull Request / Internal Tests
```

## Getting Started

> You can use [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/) to generate bot password.

### Struture

```bash
/my-bot-folder
│   docker-compose.yml
└───config  
|   └─── larbin.yml
```

Docker-Compose :
```yaml
# .../my-bot-folder/docker-compose.yml
version: "3"

services:
  bot:
    image: ealen/larbinbot:latest
    environment:
      - DEBUG: true
      - LARBIN_FILE: /tmp
      - LARBIN_TWITCH_USERNAME: Larbin
      - LARBIN_TWITCH_PASSWORD: oic:password
      - LARBIN_TWITCH_CHANNEL: example
    volumes:
      - ${PWD}/config:/tmp
```

Larbin Configuration File :
```yml
# .../my-bot-folder/config/larbin.yml
commands:
  - name: '!hello'
    policies:
      others: true
    messages: 
      - 'Hello from my bot !'
```

```bash
docker-compose up -d
```

## Larbin Configuration File (LCF)

You must configure this bot with configuration file `larbin.yml`. 
This file contain all actions/events and commands. 
By default, this file is on the root of project.

You can override path of this file with envirenment variable :

``` bash
LARBIN_FILE=/tmp
```

You can also use DEBUG MODE with : 

``` bash
DEBUG=true
```

## Larbin Credentials

``` bash
LARBIN_TWITCH_USERNAME: Larbin
LARBIN_TWITCH_PASSWORD: oic:password
LARBIN_TWITCH_CHANNEL: example
```

### Sample

``` yaml
tools:
  commands:
    # Command to start/stop schedulers
    # (The schedulers is started by default on bot starting.)
    # Example:
    # !schedulers status
    # !schedulers on
    # !schedulers off
    - type: schedulers
      name: '!schedulers'
      policies:
        mod: true
        admin: true
      argOn: 'on'
      argOff: 'off'
      argStatus: 'status'
commands:
  - name: '!facebook' # Command to write 
    random: false # Takes a random message from the list rather than following the order of the list
    policies:
      others: true # All
    messages: 
      - 'My Facebook is https://facebook.com/example'
  - name: '!twitter'
    policies:
      others: true # All
    messages: 
      - 'My Twitter is https://twitter.com/example'
schedulers:
  - id: 'social' # Required, is only used to make this scheduler unique
    minutes: 10 # Send message every minutes
    random: true # Takes a random message from the list rather than following the order of the list 
    messages:
    - 'Follow me on Twitter https://twitter.com/example'
  - id: 'other'
    minutes: 5
    messages:
    - 'Text rolling 1'
    - 'Text rolling 2'
    - 'Text rolling 3'
events:
  - name: 'join' # Event type
    random: true # Takes a random message from the list rather than following the order of the list 
    messages:
      - 'Less noise {{ Username }} is coming!'
      - 'Ah! We are talking about you {{ Username }} !'
  - name: 'raided'
    messages: 
      - 'Thanks to {{ Username }} for this raid of {{ Viewers }} viewers !'
  - name: 'resub'
    messages: 
      - 'Thanks {{ Username }} for your {{ Months }} with us ! -- {{ Username }} say: {{ Message }}'
  - name: 'submysterygift'
    messages: 
      - '{{ Username }} is rich and he just offered {{ OfferedSubs }} subscription! Thank him in the chat! (with a total of {{ GiftCount }} subscription offered)'
  - name: 'subgift'
    messages: 
      - 'Hey ! {{ Username }} is {{ GiftCount }}x more generous with {{ RecipientUsername }} !'
  - name: 'subscription'
    messages: 
      - 'I know someone from sub, but, I say anything, alright {{ Username }} ?'
```

### Policies

**Warning**, by default, everything is blocked for everyone. You must allow at least one.

``` yaml
# DEFAULT POLICIES VALUES
policies:
  admin: false # Allow Admins/Streamer
  mod: false # Allow Moderators
  vip: false # Allow VIP
  sub: false # Allow Subscriber
  others: false # Allow/Disallow all/others
```
