<template>
  <div class="home flex xs12 md8 offset-md2">
    <h1 class="mb-5">LarbinBot</h1>

    <v-container>
      <v-row>
        <v-img class="mr-1" v-for="(badge, index) in Badges" v-bind:key="index" max-height="26" max-width="150" :src="badge" />
      </v-row>
    </v-container>
    
    <v-container>
      <p>Completely customizable Twitch Bot.</p>
    </v-container>

    <v-container class="d-flex justify-center">
      <v-img max-height="320" max-width="580" src="@/assets/larbinbot.png"></v-img>
    </v-container>

    <v-container> 
      <h3>Samples</h3>
      <div class="mt-2">
        <Samples />
      </div>
    </v-container>

    <v-container> 
      <h3>License</h3>
      <p>
        LarbinBot is distributed by an <a href="https://github.com/Ealenn/LarbinBot/blob/master/LICENSE.txt" target="_BLANK">GNU Lesser General Public License</a>
      </p>
    </v-container>

    <v-container>
      <h3>Contributing</h3>

      <p>When contributing to this repository, please first discuss the change you wish to make via issue,
      email, or any other method with the owners of this repository before making a change.</p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Samples from '@/components/SamplesComponent.vue'
@Component({
  components: {
    Samples
  },
})
export default class Home extends Vue {
  public Badges = [
    'https://img.shields.io/codecov/c/github/ealenn/LarbinBot?style=for-the-badge&logo=codecov',
    'https://img.shields.io/github/stars/Ealenn/LarbinBot?style=for-the-badge&logo=github',
    'https://img.shields.io/github/issues/Ealenn/LarbinBot?style=for-the-badge&logo=github',
    'https://img.shields.io/github/v/release/ealenn/LarbinBot?style=for-the-badge',
    'https://img.shields.io/docker/pulls/ealen/larbinbot?style=for-the-badge'
  ];
}
</script>
