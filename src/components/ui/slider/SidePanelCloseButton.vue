<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SidePanelCloseButton',
  emits: ['close'],
});
</script>

<template>
  <div
    class="vsp-close shadow-8"
    @click="$emit('close')"
  >
    <span class="vsp-close__x" />
  </div>
</template>
