const state = {
  main: 1
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  increment ({ commit }) {
    commit('INCREMENT_MAIN_COUNTER')
  },
  decrement ({ commit }) {
    commit('DECREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
