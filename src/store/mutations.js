import Vue from 'vue'

const UPDATE_TEST_STORE = (state, payload) => {
  state.testStore = payload;
};


const ADD_UPDATE_PLAYER = (state, player) => {
  if (!player.name) {
    throw Error('ADD_UPDATE_PLAYER requires a player name')
  }
  const name = player.name

  // Does this handle duplicates? Should I worry about that?
  let loot
  if (state.players[name]){
    loot = [ ...state.players[name].loot, ...player.loot ]
  } else {
    loot = player.loot
  }

  Vue.set(state.players, name, {
    name,
    loot
  })
};

export default {
  UPDATE_TEST_STORE,
  ADD_UPDATE_PLAYER,
};