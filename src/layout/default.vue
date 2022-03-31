<template>
  <body>
    <div class="app-container shadow-7">
      <slot name="header" />
      <slot />
      <div class="app-container__footer">
        <slot name="footer" />
      </div>
    </div>
    <q-inner-loading
      :showing="false"
      label="お待ちください"
      label-class="text-black"
      label-style="font-size: 1.5rem"
    />
  </body>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Default'
})
</script>
