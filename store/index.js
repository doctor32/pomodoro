export const state = () => ({
  showFAQ: false
})

export const mutations = {
  changeFaqStatus(state, status) {
    state.showFAQ = status
  }
}