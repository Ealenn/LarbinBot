import Vue from 'vue'
import Vuex from 'vuex'
import { CommandStore } from './CommandStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    command: CommandStore
  }
})
