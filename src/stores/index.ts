// import { useAuthStore } from './auth'
import { useUserStore } from './user'

export const useStores = () => ({
  userStore: useUserStore(),
})
