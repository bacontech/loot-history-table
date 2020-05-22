const actionUpdateTestStore = (context, payload) => {
  context.commit('UPDATE_TEST_STORE', payload);
};

const addMultiplePlayerAttendance = (context, playersAttendance) => {

  if (!Array.isArray(playersAttendance)) {
    throw Error('playersAttendance needs to be an array')
  }
  playersAttendance.forEach(playerAttendance => {
    context.commit('ADD_UPDATE_PLAYER_ATTENDANCE', playerAttendance)
  })
};

const addMultiplePlayers = (context, players) => {
  //Loop through players, add individually
  if (!Array.isArray(players)) {
    throw Error('players needs to be an array')
  }

  players.forEach(player => {
    context.commit('ADD_UPDATE_PLAYER', player);
  });
};

export default {
  actionUpdateTestStore,
  addMultiplePlayers,
  addMultiplePlayerAttendance,
};