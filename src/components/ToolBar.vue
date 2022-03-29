<template>
  <div>
    <Icon
      icon="bi:emoji-sunglasses"
      color="#000"
      width="32"
      height="32"
      :inline="true"
    />
    ToolBar
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue';
export default defineComponent({
  name: 'ToolBar',
  components: { Icon }
})
</script>
