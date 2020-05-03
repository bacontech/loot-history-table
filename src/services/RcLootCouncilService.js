import axios from 'axios'
import * as Papa from 'papaparse'

const httpClient = axios.create()

// TODO: I'd like this to abstract the conversion from the RC Loot Council format to our format?

export default class RcLootCouncilService {

  constructor () {
    // Freezing an object does not allow new properties to be added to an
    // object and prevents from removing or altering the existing properties.
    Object.freeze(this)
  }

  getUrl () {
    return 'https://raw.githubusercontent.com/bacontech/loot-history-table/master/src/resources/loot-may-1-export.csv'
  }

  async getLootHistoryFromGitHub (url) {
    if (!url) {
      throw Error('RcLootCouncilService requires a URL')
    }

    try {
      const response = await httpClient.get(url)
      return this.transformToOurFormat(response)
    } catch (e) {
      if (e !== 'ECONNABORTED') {
        console.error('failed to retrieve loot. Connection aborted.')
        throw e
      }
    }
  }

  transformToOurFormat (response) {
    const csvData = response.data;

    // Parse
    // Results look like
    // parsed.data = [ row, row2]
    // row = { player, date, time, item, boss, class, equipLoc, instance, itemID, itemString, owner, response}

    const parsedCsv = Papa.parse(csvData, { header: true})
    const converted = []
    parsedCsv.data.forEach(lootRecord => {
      if (!lootRecord.player) {
        return
      }

      // Strip out server
      const name = lootRecord.player.substr(0,lootRecord.player.indexOf('-'));

      converted.push({
        name: name,
        loot: [{
          name,
          item: lootRecord.item,
          itemId: lootRecord.itemID,
          itemString: lootRecord.itemString,
          date: lootRecord.date,
          rollType: lootRecord.response
        }]
      })
    })


    // const examplePlayer = {
    //   name,
    //   loot
    // }
    return converted
  }
}

