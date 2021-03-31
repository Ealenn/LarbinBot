# LarbinBot

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/LarbinBot?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/LarbinBot)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/LarbinBot?style=for-the-badge&logo=github)](https://github.com/Ealenn/LarbinBot/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/LarbinBot?style=for-the-badge&logo=github)](https://github.com/Ealenn/LarbinBot/issues)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ealenn/LarbinBot?style=for-the-badge)

Completely customizable Twitch Bot. 

## Features

- [x] Execute commands
    - [x] Simple answer 
    - [ ] Custom command
- [ ] Role-Based Access Control
    - [ ] Interaction with custom APIs
    - [ ] Interaction with twitch APIs
        - [ ] Change Title
        - [ ] Predictions
- [ ] Event-based Action
    - [ ] Simple answer
        - [ ] raided
        - [ ] resub
        - [ ] submysterygift
        - [ ] subgift
        - [ ] subscription
- [x] Scheduler
    - [x] Chat message
    - [ ] Execute command

## Configuration

``` bash
# Configuration
LARBIN_FILE=... # Optional

# Twitch Credentials
LARBIN_TWITCH_USERNAME=...
LARBIN_TWITCH_PASSWORD=...
LARBIN_TWITCH_CHANNEL=...
```

## Bot Automation 

``` yaml
commands:
  - name: '!facebook'
    message: 'My Facebook is https://facebook.com/example'
  - name: '!twitter'
    message: 'My Twitter is https://twitter.com/example'
schedulers:
  - id: 'social'
    minutes: 10
    messages:
    - 'Follow me on Twitter https://twitter.com/example'
  - id: 'other'
    minutes: 5
    messages:
    - 'Text rolling 1'
    - 'Text rolling 2'
    - 'Text rolling 3'
events:
  - name: 'raidded'
    - message: 'Thanks to {{ Username }} for this raid of {{ Viewers }} viewers !'
```
