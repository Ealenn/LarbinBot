# Docker

## Project

```bash
/mybot
│   Dockerfile 
|   larbin.yml
```

### Dockerfile

```docker
FROM ealen/larbinbot:latest
COPY larbin.yml .
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

## Run

```bash
docker run --rm \
  -e DEBUG=true \
  -e LARBIN_TWITCH_USERNAME= Larbin \
  -e LARBIN_TWITCH_PASSWORD= oic:password \
  -e LARBIN_TWITCH_CHANNEL= example \
  my-custom-image:latest
```
