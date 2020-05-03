<template>
  <div class="loot-page">
    <h1>Tegrity Loot History</h1>
    <br>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :groupOptions="{
        enabled: true
      }"
      :search-options="{
        enabled: true,
        searchFn: mySearchFunction
      }"
      :sort-options="{
        enabled: true,
        initialSortBy: {field: 'date', type: 'desc'}
      }"
    >
    </vue-good-table>
  </div>
</template>

<script>
  import { VueGoodTable } from 'vue-good-table';

  export default {
    name: 'LootPage',
    components: {
      VueGoodTable,
    },
    props: {
      msg: String
    },
    data () {
      return {
        csvData: null
      };
    },
    mounted () {
      // TODO: Then I need to devise a strategy to load a bunch of loot history into the store.
      // TODO: Then I need to create a searchable table
      // -- Sharable
      // TODO: Then I need find a way for them to add more data.
      this.proveStoreWorks()
    },
    computed: {
      stateTest () {
        return this.$store.getters.getPlayerLoot
      },
      // https://xaksis.github.io/vue-good-table/guide/configuration/column-options.html
      columns () {
        return [
          {
            label: 'Date',
            field: 'date'
          }, {
            label: 'Item',
            field: 'item'
          }, {
            label: 'Roll',
            field: 'rollType',
          }, {
            label: 'Name',
            field: 'name',
            hidden: true,
          }
        ]
      },
      rows3 () {
        return [{
          mode: "span", // span means this header will span all columns
          label: "Booster", // this is the label that'll be used for the header
          html: false, // if this is true, label will be rendered as html
          children: [
            { date: '10/20', item:'item', rollType: 'Greed'},
            { date: '10/20', item:'item2', rollType:'MS' }
          ]
        }]
      },
      rows2 () {
        return [
          { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
          { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
          { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
          { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
          { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
          { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
        ]
      },
      rows   () {
        console.log(this.$store.getters.getPlayerLootForSearchTable)
        return this.$store.getters.getPlayerLootForSearchTable
      }
    },
    methods: {
      proveStoreWorks () {
        this.$store.dispatch('actionUpdateTestStore', 'updatedFromPage')
      },
      mySearchFunction (row, col, cellValue, searchTerm) {
        if (col.field !== 'name'){
          return false
        }
        return cellValue.toLowerCase().includes(searchTerm.toLowerCase())
      },
    }
  }
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
