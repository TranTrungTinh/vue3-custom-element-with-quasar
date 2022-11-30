import { useQuasar } from 'quasar'
import { computed } from 'vue'

export const useDevices = () => {
  const $q = useQuasar()
  // 0 - 755 <-->756-1199 <-->1200
  const isMobile = computed(() => $q.screen.width <= 755)
  const isIpad = computed(() => $q.screen.width > 755 && $q.screen.width <= 1199)
  const isDesktop = computed(() => $q.screen.width > 1199)
  const isReallyMobile = computed(() => isMobile.value && $q.platform.is.mobile)
  const deviceWidth = computed(() => $q.screen.width)
  const deviceHeight = computed(() => $q.screen.height)

  return {
    isMobile,
    isIpad,
    isDesktop,
    isReallyMobile,
    deviceWidth,
    deviceHeight,
  }
}
