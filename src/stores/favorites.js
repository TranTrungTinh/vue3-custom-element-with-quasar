import { acceptHMRUpdate, defineStore } from 'pinia'

const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
// const delay = (t) => new Promise((r) => setTimeout(r, t))

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
    add() {
      this.list = [...this.list, { id: uid(), name: '保存' }]
    },
    remove (id) {
      this.list = this.list.filter(item => item.id !== id)
    },
    setSelected (id) {
      this.currentId = id
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}
