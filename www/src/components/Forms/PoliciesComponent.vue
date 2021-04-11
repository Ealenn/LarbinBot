<template>
  <div class="policies-form-componant">
    <v-container>
      <v-row>
        <v-switch class="mr-3" v-if="!model.others" v-model="model.admin" inset label="Streamer"></v-switch>
        <v-switch class="mr-3" v-if="!model.others" v-model="model.mod" inset label="Moderators"></v-switch>
        <v-switch class="mr-3" v-if="!model.others" v-model="model.vip" inset label="VIP"></v-switch>
        <v-switch class="mr-3" v-if="!model.others" v-model="model.sub" inset label="Subscriber"></v-switch>
        <v-switch v-model="model.others" inset label="All"></v-switch>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Policies } from "@/lib/Policies";

@Component({
  components: {},
})
export default class PoliciesComponent extends Vue {
  @Prop({ required: true })
  public model!: Policies;
}
</script>
