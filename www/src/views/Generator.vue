<template>
  <div class="generator">
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-card class="ma-2 pa-2" outlined tile>
            <v-tabs v-model="TabId">
              <v-tab href="#tab-commands">Commands</v-tab>
            </v-tabs>

            <v-tabs-items v-model="TabId">
              <v-tab-item value="tab-commands">
                <CommandTree />
                <CommandForm v-bind:show="showAddCommandForm" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="ma-2" flat tile>
            <Yaml />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import CommandForm from '@/components/Forms/CommandForm.vue'
import CommandTree from '@/components/CommandTreeComponent.vue'

import { Component, Vue } from 'vue-property-decorator'
import { Command } from '@/lib/Command'
import Yaml from '@/components/YamlComponent.vue'

@Component({
  components: {
    CommandForm,
    Yaml,
    CommandTree
  },
})
export default class Generator extends Vue {
  public showAddCommandForm = false;
  public TabId = '';

  get Commands() : Array<Command> {
    return this.$store.state.command.commands;
  }
}
</script>
