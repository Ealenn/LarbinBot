<template>
  <div class="command-form pa-5">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }" class="center">
        <v-btn block outlined v-bind="attrs" v-on="on">
          Add Command
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">New Command</v-card-title>
        <v-card-subtitle>{{ formModel.Name }}</v-card-subtitle>
        <v-card-text>
          <validation-observer ref="observer">
            <form @submit.prevent="Submit" >
              <v-card outlined class="pa-5">
                <div class="overline mb-4">Command</div>
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|min:1|max:50"
                >
                  <v-text-field
                    v-model="formModel.name"
                    :counter="50"
                    :error-messages="errors"
                    label="Name"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-card>

              <v-card outlined class="pa-5 mt-5">
                <div class="overline mb-4">Strategy</div>
                <v-container>
                  <v-row>
                    <v-switch class="mr-3" v-model="formModel.random" inset :label="formModel.random ? 'Random' : 'Round Robin'"></v-switch>
                  </v-row>
                </v-container>
              </v-card>

              <v-card outlined class="pa-5 mt-5">
                <div class="overline mb-4">Policies</div>
                <PoliciesComponent :model="formModel.policies" />
              </v-card>

              <v-card outlined class="pa-5 mt-5">
                <div class="overline mb-4">Messages</div>
                <div
                  v-for="(message, index) in formModel.messages"
                  v-bind:key="'MESSAGE#' + index"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    :name="'Message #' + (index + 1)"
                    rules="required|max:500"
                  >
                    <v-text-field
                      append-icon="far fa-trash-alt"
                      @click:append="RemoveMessage(index)"
                      v-model="formModel.messages[index]"
                      :counter="500"
                      :error-messages="errors"
                      :label="'Message #' + (index + 1)"
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <v-card-actions>
                  <v-btn color="default" text @click="AddMessage()">
                    <v-icon left>
                      fas fa-plus
                    </v-icon>
                    Add message
                  </v-btn>
                </v-card-actions>
              </v-card>
            </form>
          </validation-observer>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="Cancel()">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="Submit()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Command } from "@/lib/Command";
import { Policies } from "@/lib/Policies";
import { ValidationObserver, ValidationObserverInstance, ValidationProvider } from "vee-validate";
import PoliciesComponent from "./PoliciesComponent.vue";

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    PoliciesComponent,
  },
})
export default class CommandForm extends Vue {
  public formModel: Command;
  public dialog = false;

  constructor() {
    super();
    this.formModel = this.getDefault();
  }

  public getDefault(): Command {
    return new Command("!example", false, new Policies(), [""]);
  }

  public async Submit(): Promise<void> {
    if (await (this.$refs.observer as ValidationObserverInstance).validate()) {
      this.$store.commit("addCommand", this.formModel);
      this.Cancel();
    }
  }

  public Cancel(): void {
    this.formModel = this.getDefault();
    (this.$refs.observer as ValidationObserverInstance).reset();
    this.dialog = false;
  }

  public AddMessage(): void {
    this.formModel.messages.push("");
  }

  public RemoveMessage(index: number): void {
    this.formModel.messages = this.formModel.messages.filter(
      (_, i) => i != index
    );
  }
}
</script>
