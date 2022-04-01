import { acceptHMRUpdate, defineStore } from "pinia";

export const useGlobalLoading = defineStore("global-loading", {
  state: () => ({
    isLoading: false
  }),
  actions: {
    start() {
      this.isLoading = true
    },
    end() {
      this.isLoading = false
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalLoading, import.meta.hot));
}
