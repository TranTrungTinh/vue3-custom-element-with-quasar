import { acceptHMRUpdate, defineStore } from "pinia";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useFavorites = defineStore("favorites", {
  state: () => ({
    currentId: null,
    list: [] as FavoritesList[],
  }),

  getters: {
    favorites: (state) => state.list,
    currentItem: (state) =>
      state.currentId
        ? state.list.find((item) => item.id === state.currentId)
        : {} as AnyObject,
  },
  actions: {
    add(name: string) {
      const newItem = { id: uid(), name }
      this.list = [...this.list, newItem];
      this.setSelected(newItem.id)
    },
    removeCurrent() {
      this.list = this.list.filter((item) => item.id !== this.currentId);
      this.currentId = null
    },
    editCurrent(name: string) {
      this.list = this.list.map((item) => {
        if (item.id !== this.currentId) return item
        return { ...item, name }
      });
    },
    setSelected(id) {
      this.currentId = id;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot));
}
