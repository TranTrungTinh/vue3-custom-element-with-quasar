
/* eslint-disable vue/one-component-per-file */
import { defineComponent } from 'vue'
import { useDevices } from '@/hooks'

/**
 * @example <responsive desktop><component /></responsive>
 * @example <responsive mobile><component /></responsive>
 * @example <responsive both><component /></responsive>
 * @example
  <responsive>
    <template #desktop>Desktop</template>
    <template #mobile>Mobile</template>
  </responsive>
 */
export const Responsive = defineComponent({
  name: 'Responsive',
  props: {
    both: Boolean,
    desktop: Boolean,
    mobile: Boolean
  },
  setup(props, context) {
    const { isMobile } = useDevices()

    return () => {
      // render
      if (props.both) {
        return context.slots.default?.()
      }
      // desktop
      if (props.desktop && !isMobile.value) {
        return context.slots.default?.()
      }
      // mobile
      if (props.mobile && isMobile.value) {
        return context.slots.default?.()
      }

      // slot mode
      return isMobile.value ? context.slots.mobile?.() : context.slots.desktop?.()
    }
  }
})

export const DesktopOnly = defineComponent({
  name: 'DesktopOnly',
  setup(_, context) {
    const { isMobile } = useDevices()
    return () => !isMobile.value && context.slots.default?.()
  }
})
