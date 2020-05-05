<template>
  <div class="loot-page">
    <h1>Tegrity Loot History</h1>
    <br>
    <div>

    </div>
    <div class="checkbox-container">
      <label class="checkbox-component">
        Bis & Need Only
        <input id="bis" type="checkbox" value="bisNeed" v-model="checkedOptions">
        <span class="checkmark"></span>
      </label>

    </div>
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
        checkedOptions: ['bisNeed'],
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
        if (this.checkedOptions.includes('bisNeed')) {
          return this.$store.getters.getPlayerLootForSearchTableBisNeedOnly
        } else {
          return this.$store.getters.getPlayerLootForSearchTable
        }

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

  /* Start CHECKBOX CSS */
  /* Hide the browser's default checkbox */
  .checkbox-container {
    width: 30%;
    margin: auto;
  }

  .checkbox-component {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .checkbox-component input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .checkbox-component:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .checkbox-component input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox-component input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkbox-component .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  /* End CHECKBOX CSS */
</style>
