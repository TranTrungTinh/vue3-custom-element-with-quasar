<script lang="ts">
import { defineComponent } from "vue";
import { FrameIcon, RimlessIcon } from "@/components";
export default defineComponent({
  name: 'TryOn',
  components: {
    RimlessIcon,
    FrameIcon
  },
  props: {
    isFrame: {
      type: Boolean,
      required: true,
      default: () => false
    }
  }
})
</script>
<template>
  <section class="go-main">
    <frame-icon
      v-if="isFrame"
      class="go-main--icon"
    />
    <rimless-icon
      v-else
      class="go-main--icon"
    />
  </section>
</template>