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

  getLootHistoryUrl () {
    return 'https://raw.githubusercontent.com/bacontech/loot-history-table/master/src/resources/loot_export.txt'
  }

  getAttendanceUrl () {
    return 'https://docs.google.com/spreadsheets/d/1OCcdSVagR3lLKcpOmndnmUSScsW22IvwbvBw93B4HSE/export?gid=610743414&format=csv&id=1OCcdSVagR3lLKcpOmndnmUSScsW22IvwbvBw93B4HSE'
  }

  async getAttendanceHistoryFromGoogleSheets (url) {
    if (!url) {
      throw Error('RcLootCouncilService requires a URL')
    }

    try {
      const response = await httpClient.get(url)
      return this.transformAttendanceToOurFormat(response)
    } catch (e) {
      if (e !== 'ECONNABORTED') {
        console.error('failed to retrieve loot. Connection aborted.')
        throw e
      }
    }

  }

  async getLootHistoryFromGitHub (url) {
    if (!url) {
      throw Error('RcLootCouncilService requires a URL')
    }

    try {
      const response = await httpClient.get(url)
      return this.transformLootToOurFormat(response)
    } catch (e) {
      if (e !== 'ECONNABORTED') {
        console.error('failed to retrieve loot. Connection aborted.')
        throw e
      }
    }
  }

  convertNames (name) {
    // if (name.substring(0, 1) === 'J') {
    //   console.log(name)
    // }
    if (name === 'JÃ¶rl') {
      return 'Jörl'
    }
    return name
  }

  transformAttendanceToOurFormat (response) {
    const csvData = response.data;

    const parsedCsv = Papa.parse(csvData, {header: true})
    const converted = []
    parsedCsv.data.forEach(attendanceRecord => {

      let name = attendanceRecord.Name;
      name = this.convertNames(name);

      console.log(attendanceRecord)
      const attendance30Day = attendanceRecord['30 Day'];
      const attendance60Day = attendanceRecord['60 Day'];
      const attendance90Day = attendanceRecord['90 Day'];

      if (!attendanceRecord.Name) {
        return
      }

      converted.push({
        name,
        attendance30Day,
        attendance60Day,
        attendance90Day,
      })
    });
    return converted;
  }


    transformLootToOurFormat (response) {
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

