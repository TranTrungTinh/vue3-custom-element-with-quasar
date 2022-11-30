<template>
  <q-layout :id="META.appName" view="hHh lpR fFf">
    <q-page-container>
      <q-page :style-fn="myTweak">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useDevices } from '@/hooks'
import { META } from '@/configs/app.config'

export default defineComponent({
  name: 'DefaultLayout',
  setup() {
    const { deviceHeight } = useDevices()

    const myTweak = (offset: number, height: number) => {
      return { height: offset ? `${deviceHeight.value - offset}px` : `${height}px` }
    }

    return {
      myTweak,
      META
    }
  }
})
</script>

