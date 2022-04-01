/**
 * @file App enhancers
 * @module app.enhancer
 */

import { useCustomization } from "@/hooks/useCustomization";
import { useToast } from "vue-toastification";
import { useFavorites } from "@/stores/favorites";
import { useGlobalLoading } from "@/stores/loading";

export const useEnhancer = () => {
  const { actions, actionTypes } = useCustomization();
  const toast = useToast();
  const storeFavorites = useFavorites();
  const storeGlobalLoading = useGlobalLoading()

  return {
    actions,
    actionTypes,
    toast,
    storeFavorites,
    storeGlobalLoading
  };
};