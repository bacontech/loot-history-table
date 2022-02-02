<template>
  <div>
    <h1>Loot Points</h1>
    <v-simple-table class="striped-table">
      <template v-slot:default>
        <thead><tr>
          <th class="text-left"></th>
          <th class="text-left">Name</th>
          <th class="text-left">Class</th>
          <th class="text-left">Rank</th>
          <th class="text-left">EP</th>
          <th class="text-left">GP</th>
          <th class="text-left">PR</th>
        </tr></thead>
        <tbody>
        <tr
          v-for="(player,i) in cleanData"
          :key="`player-${player.Name}`"
        >
          <td class="text-left">{{ i + 1 }}</td>
          <td class="text-left">{{ player.Name }}</td>
          <td class="text-left">{{ player.Class }}</td>
          <td class="text-left">{{ player.Rank }}</td>
          <td class="text-left">{{ player.EP }}</td>
          <td class="text-left">{{ player.GP }}</td>
          <td class="text-left">{{ player.PR }}</td>

        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import * as Papa from 'papaparse'
// import epgp from '@/resources/epgp.csv'

export default {

  async mounted() {
    await this.setRawDataFromGithub()
  },
  data: () => ({
    rawData: undefined,
  }),
  computed: {
    cleanData () {
      if (this.rawData === undefined) {
        return []
      }

      const clean = this.rawData
        .filter(p => p.EP > 0)

      clean.sort( (a,b) => {
        return b.PR - a.PR
      })
      return clean
    },
  },
  methods: {
    // This was useful prior to having the csv deployed
    async getLootPoints () {
      // this.parseData(epgp)
    },
    async setRawDataFromGithub () {
      try {
        const url = 'https://raw.githubusercontent.com/bacontech/loot-history-table/master/src/resources/epgp.csv'
        const response = await this.$http.get(url)
        const csvBlob = response.data
        this.parseData(csvBlob)
      } catch (ex) {
        console.error(ex)
      }
    },
    parseData (csvBlob) {
      const papaparsed = Papa.parse(csvBlob, { header: true})
      // [{ Name,Class,Guild Rank}]
      this.rawData = papaparsed.data
    }
  },

}
</script>
