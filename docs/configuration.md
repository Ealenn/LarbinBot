# Configuration

## Environment Variables

``` bash
# Path to larbin.yml configuration file
LARBIN_FILE=/tmp

# Debug mode
DEBUG=true

# Twitch Credentials
LARBIN_TWITCH_USERNAME: Larbin
LARBIN_TWITCH_PASSWORD: oic:password
LARBIN_TWITCH_CHANNEL: example
```

## Larbin Configuration File

You must configure this bot with configuration file `larbin.yml`. 
This file contain all actions/events and commands.

### Commands

```yaml
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
```

### Schedulers

```yaml
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
```

### Events

```yaml
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

### Tools

```yaml
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
