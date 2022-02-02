<template>
  <div id="app">
    <v-app>
      <h1>Loot</h1>
      <v-main app>
        <v-container class="pb-20">
<!--          <p>Info: </p>-->
<!--          <p>{{ currentRouteName }}</p>-->
<!--          <p>{{ currentRoutePath }}</p>-->
<!--          <p>{{ currentRouteFullPath }}</p>-->
<!--          <p>{{ currentRouteKeys }}</p>-->
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
    currentRouteName() {
      return this.currentRoute.name
    },
    currentRoutePath() {
      return this.currentRoute.path
    },
    currentRouteFullPath() {
      return this.currentRoute.fullPath
    },
    currentRoute () {
      const current =  this.$router.currentRoute
      return current || {};
    },
    currentRouteKeys () {
      const current =  this.$router.currentRoute
      return Object.keys(current)
    },
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
