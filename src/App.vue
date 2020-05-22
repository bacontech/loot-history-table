<template>
  <div id="app">
    <div
      v-if="failedToLoadData"
      >
      <h3>An error occurred loading loot data.</h3>
    </div>
    <div class="loading-group"
       v-if="showLoadingSpinner"
    >
      <loading-progress
        :indeterminate="true"
        shape="semicircle"
        size="64"
      ></loading-progress>
      <h3>Grabbing Loot Data...</h3>
    </div>
    <LootPage
      v-if="!showLoadingSpinner"
    ></LootPage>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LootPage from './components/LootPage';
import RcLootCouncilService from './services/RcLootCouncilService';

export default {
  name: 'App',
  components: {
    LootPage,

  },
  data () {
    return {
      rcLootCouncilService: new RcLootCouncilService(),
      loading: {
        isLootLoaded: false,
        isAttendanceLoaded: false
      },
      failedToLoadData: false,
      csvData: null
    }
  },
  mounted () {
    // -- Sharable
    // TODO: I need find a way for them to add more data.
    this.fetchLootHistory();
    this.fetchAttendanceHistory();
  },
  computed: {
    showLoadingSpinner () {
      return !this.loading.isLootLoaded || !this.loading.isAttendanceLoaded;
    }
  },
  methods: {
    ...mapActions({
      addMultiplePlayers: 'addMultiplePlayers', // map `this.add()` to `this.$store.dispatch('increment')`
      addMultiplePlayerAttendance: 'addMultiplePlayerAttendance'
    }),
    async fetchLootHistory () {
      const uri = this.rcLootCouncilService.getLootHistoryUrl()
      const players = await this.rcLootCouncilService.getLootHistoryFromGitHub(uri)

      this.addMultiplePlayers(players)
      this.loading.isLootLoaded = true
    },
    async fetchAttendanceHistory () {
      const uri = this.rcLootCouncilService.getAttendanceUrl()
      try {
        const playersAttendance = await this.rcLootCouncilService.getAttendanceHistoryFromGoogleSheets(uri)
        this.addMultiplePlayerAttendance(playersAttendance)
      } catch (e) {
        console.log(e)
      }



      this.loading.isAttendanceLoaded = true
    }
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
