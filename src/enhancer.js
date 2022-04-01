import { useCustomization, actionTypes } from '@/hooks/useCustomization'
import { useToast } from "vue-toastification";
import { useFavorites } from '@/stores/favorites'

export const useEnhancer = () => {
  const { actions } = useCustomization()
  const toast = useToast();
  const storeFavorites = useFavorites()

  return {
    actions,
    actionTypes,
    toast,
    storeFavorites
  }
}