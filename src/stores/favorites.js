import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFavorites = defineStore('favorites', {
  state: () => ({
    currentId: null,
    list: [],
  }),

  getters: {
    favorites: (state) => state.list,
    currentItem: state => state.currentId ? state.list.find(item => item.id === state.currentId) : {}
  },
  actions: {
    set(list) {
      this.list = list
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}
