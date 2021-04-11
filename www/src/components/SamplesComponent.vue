<template>
  <v-card
    flat
  >
    <v-tabs vertical>
      <v-tab>
        <v-icon left>fab fa-docker</v-icon>
        Docker
      </v-tab>
      <v-tab>
        <v-icon left>fab fa-octopus-deploy</v-icon>
        Compose
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h4>Files</h4>
            <v-treeview
              hoverable
              open-all
              :items="[
              { name: '/usr/project/twitch-bot', children: [
                { name: 'Dockerfile', icon: 'fab fa-docker' },
                { name: 'larbin.yml', icon: 'far fa-file' }
              ]}]"
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.icon">far fa-folder</v-icon>
                <v-icon v-else>
                  {{ item.icon }}
                </v-icon>
              </template>
            </v-treeview>

            <h4 class="mt-3">Dockerfile</h4>
            <highlightjs language='Dockerfile' :code="`
FROM ealen/larbinbot:latest
COPY larbin.yml .
            `" />

            <h4 class="mt-3">larbin.yml</h4>
            <highlightjs language='yaml' :code="`
commands:
  - name: '!hello'
    policies:
      others: true
    messages: 
      - 'Hello from my bot !'
            `" />

            <h4 class="mt-3">Run</h4>
            <highlightjs language='bash' :code="`
docker run --rm \\
  -e DEBUG=true \\
  -e LARBIN_TWITCH_USERNAME= Larbin \\
  -e LARBIN_TWITCH_PASSWORD= oic:password \\
  -e LARBIN_TWITCH_CHANNEL= example \\
  my-custom-image:latest
            `" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h4>Files</h4>
            <v-treeview
              hoverable
              open-all
              :items="[
              { name: '/usr/project/twitch-bot', children: [
                { name: 'docker-compose.yml', icon: 'fab fa-docker' },
                { name: 'config', children: [
                  { name: 'larbin.yml', icon: 'far fa-file' }
                ] }
              ]}]"
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.icon">far fa-folder</v-icon>
                <v-icon v-else>
                  {{ item.icon }}
                </v-icon>
              </template>
            </v-treeview>

            <h4 class="mt-3">docker-compose.yml</h4>
            <highlightjs language='yaml' code="
version: 3

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
      " />

            <h4 class="mt-3">config/larbin.yml</h4>
            <highlightjs language='yaml' :code="`
commands:
  - name: '!hello'
    policies:
      others: true
    messages: 
      - 'Hello from my bot !'
            `" />

            <h4 class="mt-3">Run</h4>
            <highlightjs language='bash' :code="`
docker-compose up
            `" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class SamplesComponent extends Vue {
  public TabId = '';
}
</script>
