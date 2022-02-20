export default {
  async loadAnalysis ({ commit }, analysisId) {
    commit('setActiveAnalysis', analysisId)
  }
}
