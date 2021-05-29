<template>
  <div class="configuration flex xs12 md8 offset-md2">
    <h1 class="mb-5" style="font-size:5rem">Configuration</h1>

    <v-container>
      <h2 id="environment-variables">Environment Variables</h2>
      <highlightjs language='bash' :code="`
        # Path to larbin.yml configuration file
        LARBIN_FILE=/tmp

        # Debug mode
        DEBUG=true

        # Single command threshold per second
        LARBIN_THRESHOLD=5

        # Twitch Credentials
        LARBIN_TWITCH_USERNAME: Larbin
        LARBIN_TWITCH_PASSWORD: oic:password
        LARBIN_TWITCH_CHANNEL: example
      `" />
    </v-container>

    <v-container>
      <h2 id="larbin-configuration-file">Larbin Configuration File</h2>
      <p>
        You must configure this bot with configuration file
        <code class="language-plaintext highlighter-rouge">larbin.yml</code>. This
        file contain all actions/events and commands.
      </p>
    </v-container>

    <v-container>
      <h3 id="commands">Commands</h3>
      <highlightjs language='yaml' :code="`
        commands:
          - name: '!facebook' # Command to write 
            random: false # Takes a random message from the list rather than following the order of the list
            policies:
              others: true # All
            messages: 
              - 'My Facebook is https://facebook.com/example'
              - 'Like Facebook page https://twitter.com/example (This question has been asked {{ Count }} times)'
      `" />
    </v-container>

    <v-container>
      <h3 id="schedulers">Schedulers</h3>
      <highlightjs language='yaml' :code="`
        schedulers:
          - id: 'social' # Required, is only used to make this scheduler unique
            minutes: 10 # Send message every minutes
            random: true # Takes a random message from the list rather than following the order of the list 
            messages:
            - 'Follow me on Twitter https://twitter.com/example'
      `" />
    </v-container>

    <v-container>
      <h3 id="events">Events</h3>
      <highlightjs language='yaml' :code="`
        events:
          - name: 'join' # Event type
            random: true # Takes a random message from the list rather than following the order of the list 
            messages:
              - 'Less noise  is coming!'
              - 'Ah! We are talking about you  !'
          - name: 'raided'
            messages: 
              - 'Thanks to  for this raid of  viewers !'
          - name: 'resub'
            messages: 
              - 'Thanks  for your  with us ! --  say: '
          - name: 'submysterygift'
            messages: 
              - ' is rich and he just offered  subscription! Thank him in the chat! (with a total of  subscription offered)'
          - name: 'subgift'
            messages: 
              - 'Hey !  is x more generous with  !'
          - name: 'subscription'
            messages: 
              - 'I know someone from sub, but, I say anything, alright  ?'
      `" />
    </v-container>

    <v-container>
      <h3 id="tools">Tools</h3>
      <highlightjs language='yaml' :code="`
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
      `" />
    </v-container>

    <v-container>
      <h3 id="policies">Policies</h3>
      <p>
        <strong>Warning</strong>, by default, everything is blocked for everyone.
        You must allow at least one.
      </p>
      <highlightjs language='yaml' :code="`
        # DEFAULT POLICIES VALUES
        policies:
          admin: false # Allow Admins/Streamer
          mod: false # Allow Moderators
          vip: false # Allow VIP
          sub: false # Allow Subscriber
          others: false # Allow/Disallow all/others
      `" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class Configuration extends Vue {
}
</script>
