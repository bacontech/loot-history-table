<template>
  <div id="app">
    <v-app>
      <h1>Loot</h1>
      <v-main app>
        <v-container class="pb-20">
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    ...mapActions({
    }),
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
