# Docker-Compose

## Project

```bash
/mybot
│   docker-compose.yml
└───config  
|   └─── larbin.yml
```

### Docker-Compose

```yml
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

### Larbin Configuration

``` yaml
commands:
  - name: '!hello'
    policies:
      others: true
    messages: 
      - 'Hello from my bot !'
```
