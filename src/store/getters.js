const getPlayerLootForSearchTable = state => {
  if (state.players === {}) {
    return []
  }
  let dataForTable = []

  Object.keys(state.players).forEach(playerName => {
    const player = state.players[playerName]

    dataForTable.push({
      mode: 'span',
      label: playerName,
      html: false,
      children: player.loot
    })
  })
  return dataForTable
}

const getPlayerLootForSearchTableBisNeedOnly = state => {
  if (state.players === {}) {
    return []
  }
  let dataForTable = []

  Object.keys(state.players).forEach(playerName => {
    const player = state.players[playerName]

    const playerLoot = player.loot.filter(loot => loot.rollType === 'Mainspec /Need' || loot.rollType === 'Best Available')

    dataForTable.push({
      mode: 'span',
      label: playerName,
      html: false,
      children: playerLoot
    })
  })
  return dataForTable
}

export default {
  getPlayerLootForSearchTable,
  getPlayerLootForSearchTableBisNeedOnly
};