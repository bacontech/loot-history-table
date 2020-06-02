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
    const attendance = player.attendance
    let label = `${playerName}`
    if (attendance.attendance30Day){
      label = `${playerName} (30d: ${attendance.attendance30Day} - 60d: ${attendance.attendance60Day} - 90d: ${attendance.attendance90Day})`
    }

    dataForTable.push({
      mode: 'span',
      label: label,
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
