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

export default {
  getPlayerLootForSearchTable
};