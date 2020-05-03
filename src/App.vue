<template>
  <div id="app">
    <div
      v-if="failedToLoadData"
      >
      <h3>An error occurred loading loot data.</h3>
    </div>
    <div class="loading-group"
       v-if="isLoadingData"
    >
      <loading-progress
        :indeterminate="true"
        shape="semicircle"
        size="64"
      ></loading-progress>
      <h3>Grabbing Loot Data...</h3>
    </div>
    <LootPage
      v-if="!isLoadingData"
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
      isLoadingData: true,
      failedToLoadData: false,
      csvData: null
    }
  },
  mounted () {
    // TODO: Then I need to devise a strategy to load a bunch of loot history into the store.
    // TODO: Then I need to create a searchable table
    // -- Sharable
    // TODO: Then I need find a way for them to add more data.
    this.fetchLootHistory();
  },
  methods: {
    ...mapActions({
      addMultiplePlayers: 'addMultiplePlayers' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    async fetchLootHistory () {
      const uri = this.rcLootCouncilService.getUrl()
      const players = await this.rcLootCouncilService.getLootHistoryFromGitHub(uri)

      this.addMultiplePlayers(players)
      this.isLoadingData = false
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
