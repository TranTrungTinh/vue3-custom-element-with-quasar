<template>
  <section>
    {{ t('app.name') }}
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useLang } from '@/hooks'
export default defineComponent({
  name: 'RootApp',
  setup () {
    const { t } = useLang()

    return {
      t
    }
  }
})
</script>
