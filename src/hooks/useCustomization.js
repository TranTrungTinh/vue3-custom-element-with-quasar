import { ref } from 'vue'
export const actionTypes = {
  MODEL: 'MODEL',
  FRAME: 'FRAME',
  RIM_TEMPLE: 'RIM_TEMPLE',
  LENS: 'LENS',
  LOGO: 'LOGO'
}

export function useCustomization() {
  const actions = ref([
    {
      label: 'モデル',
      type: actionTypes.MODEL
    },
    {
      label: 'フレーム',
      type: actionTypes.FRAME
    },
    {
      label: 'リム・テンプル(カラー)',
      type: actionTypes.RIM_TEMPLE
    },
    {
      label: 'レンズ',
      type: actionTypes.LENS
    },
    {
      label: 'ロゴ',
      type: actionTypes.LOGO
    }
  ])

  return {
    actions
  }
}