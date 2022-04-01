import { ref } from "vue";
import { actionTypes } from './enums'

export function useCustomization() {
  const actions = ref([
    {
      label: "モデル",
      type: actionTypes.MODEL,
    },
    {
      label: "フレーム",
      type: actionTypes.FRAME,
    },
    {
      label: "リム・テンプル(カラー)",
      type: actionTypes.RIM_TEMPLE,
    },
    {
      label: "レンズ",
      type: actionTypes.LENS,
    },
    {
      label: "ロゴ",
      type: actionTypes.LOGO,
    },
  ]);

  return {
    actions,
    actionTypes
  };
}
