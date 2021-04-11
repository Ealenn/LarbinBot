<template>
  <v-list subheader two-line>
    <v-list-item v-for="command in Commands" v-bind:key="command.Name">
      <v-list-item-content>
        <v-list-item-title v-text="command.name"></v-list-item-title>
        <v-list-item-subtitle v-text="`${command.messages.length} message${command.messages.length > 1 ? 's' : ''}`"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="red" v-on:click="RemoveCommand(command.name)"><v-icon>far fa-trash-alt</v-icon></v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Command } from "@/lib/Command";
import { Component, Vue } from "vue-property-decorator";
import CommandForm from '@/components/Forms/CommandForm.vue'

@Component({
  components: {
    CommandForm
  },
})
export default class CommandTreeComponent extends Vue {
  get Commands(): Array<Command> {
    return this.$store.state.command.commands;
  }

  public RemoveCommand(commandName: string): void {
    this.$store.commit("removeCommand", commandName);
  }
}
</script>
