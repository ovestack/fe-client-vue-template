<style>

</style>

<template>
  <section>
    <ul>
      <li v-for="d in data">
        {{d}}
      </li>
    </ul>
  </section>
</template>

<script>
import {init} from '../../action/index.js'

export default {
  ready() {
    this.init()
  },
  vuex: {
    getters: {
      data(state) {
        return state.posts.data
      }
    },
    actions: {
      init
    }
  }
}
</script>

