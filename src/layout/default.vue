<template>
  <body>
    <div class="app-container">
      <slot name="header" />
      <slot />
      <div class="app-container__footer">
        <slot name="footer" />
      </div>
    </div>
  </body>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Default'
})
</script>
