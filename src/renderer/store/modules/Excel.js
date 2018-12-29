const state = {
  excelData: []
}

const mutations = {
  SAVE_DATA (state, data) {
    state.excelData = data
  }
}

const actions = {
  saveExcelData ({ commit }, data) {
    commit('SAVE_DATA', data)
  }
}

export default {
  state,
  mutations,
  actions
}
