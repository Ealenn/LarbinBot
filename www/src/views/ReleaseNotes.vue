<template>
  <div class="release-notes flex xs12 md8 offset-md2">

    <div v-if="Loading">
      <v-skeleton-loader v-for="i in 5" v-bind:key="i" type="article"></v-skeleton-loader>
    </div>

    <v-container  v-for="release in Releases" v-bind:key="release.id">
      <h2>{{ release.tag_name }}</h2>

      <v-container v-html="Html(release.body)"></v-container>

      <v-container>
        <v-row>
          <a :href="release.tarball_url" target="_BLANK">
            <v-img class="mr-1" max-height="26" max-width="150" :src="`https://img.shields.io/badge/Download-TAR-green?style=flat-square&logo=github`" />
          </a>
          <a :href="release.zipball_url" target="_BLANK">
            <v-img class="mr-1" max-height="26" max-width="150" :src="`https://img.shields.io/badge/Download-ZIP-green?style=flat-square&logo=github`" />
          </a>
          <a :href="release.html_url" target="_BLANK">
            <v-img class="mr-1" max-height="26" max-width="150" :src="`https://img.shields.io/badge/View-GitHub-lightgrey?style=flat-square&logo=github`" />
          </a>
          <a :href="`https://hub.docker.com/r/ealen/larbinbot/tags?page=1&ordering=last_updated&name=${release.tag_name}`" target="_BLANK">
            <v-img class="mr-1" max-height="26" max-width="150" :src="`https://img.shields.io/badge/View-Docker-blue?style=flat-square&logo=docker`" />
          </a>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Octokit } from '@octokit/rest'
import Marked from 'marked'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class ReleaseNotes extends Vue {
  public Releases = new Array<any>();
  public Loading = true;

  constructor() {
    super();
    this._fetch();
  }

  public Html(markdown: string): string {
    return Marked(markdown);
  }

  private async _fetch(): Promise<void> {
    const octokit = new Octokit();
    const result = await octokit.rest.repos.listReleases({
      owner: 'Ealenn',
      repo: 'LarbinBot'
    });
    this.Releases = result.data;
    this.Loading = false;
  }
}
</script>
