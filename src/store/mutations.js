import Vue from 'vue'

const UPDATE_TEST_STORE = (state, payload) => {
  state.testStore = payload;
};

const ADD_UPDATE_PLAYER_ATTENDANCE = (state, playerAttendance) => {
  let name = playerAttendance.name;
  if (!name) {
    throw Error('ADD_UPDATE_PLAYER_ATTENDANCE requires a player name')
  }

  let loot = []
  if (state.players[name]) {
    loot = state.players[name].loot
  }

  const attendance = {
    attendance30Day: playerAttendance.attendance30Day,
    attendance60Day: playerAttendance.attendance60Day,
    attendance90Day: playerAttendance.attendance90Day
  }

    Vue.set(state.players, name, {
      name,
      loot,
      attendance
    })

};


const ADD_UPDATE_PLAYER = (state, player) => {
  if (!player.name) {
    throw Error('ADD_UPDATE_PLAYER requires a player name')
  }
  const name = player.name

  // Does this handle duplicates? Should I worry about that?
  let loot
  let attendance = {}
  if (state.players[name]){
    loot = [ ...state.players[name].loot, ...player.loot ]
    attendance = { ...state.players[name].attendance }
  } else {
    loot = player.loot
  }

  Vue.set(state.players, name, {
    name,
    loot,
    attendance
  })
};

export default {
  UPDATE_TEST_STORE,
  ADD_UPDATE_PLAYER,
  ADD_UPDATE_PLAYER_ATTENDANCE,
};
