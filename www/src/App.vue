<template>
  <v-app>
    <v-app-bar app color="#EAEAEA" flat>
      <div class="d-flex align-center font-weight-black">
        <v-img class="shrink mr-2" contain src="./assets/icon-512.png" transition="scale-transition" width="40" />
        Larbin B0t
      </div>

      <v-spacer></v-spacer>

      <v-btn v-for="item in Routes" v-bind:key="item.Name" @click="Navigate(item.path)" text>
        <span class="mr-2">{{ item.name }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <transition>
          <router-view />
        </transition>
      </v-container>
    </v-main>

    <v-footer padless flat>
      <v-card flat tile width="100%" color="#EAEAEA" class="text-center">
        <v-card-text>
          <v-btn class="mx-4" icon v-for="link in Social" v-bind:key="link.name" :href="link.link">
            <v-icon size="24px">{{ link.icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Rudy Marchandise</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style lang="less">
.hljs {
    background-image: linear-gradient(
    rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1.5em, rgba(0,0,0,0.02) 1.5em, rgba(0,0,0,0.02) 3em);
    background-size: auto 3em;
    background-position-y: 0.625rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-left: 0.4375rem solid #444;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { routes, social } from '@/router'

@Component({
  components: {
  },
})
export default class App extends Vue {
  public Routes = routes;
  public Social = social;

  public Navigate(path: string): void {
    this.$router.push(path);
  }
}
</script>
