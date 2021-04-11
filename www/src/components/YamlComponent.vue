<template>
  <div class="yaml-componant">
    <highlightjs language='yaml' :code="Yaml" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import YAML from 'yaml'

@Component({
  components: {},
})
export default class YamlComponent extends Vue {
  public get Yaml(): string {
    return YAML.stringify({
      commands: this.$store.state.command.commands
    }, {
      indent: 2,
      merge: true
    });
  }
}
</script>
