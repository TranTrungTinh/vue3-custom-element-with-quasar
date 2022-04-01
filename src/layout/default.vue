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
      :showing="storeGlobalLoading.isLoading"
      label="お待ちください"
      label-class="text-black"
      label-style="font-size: 1.5rem"
    />
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEnhancer } from "@/enhancer";

export default defineComponent({
  name: "Default",
  setup () {
    const { storeGlobalLoading } = useEnhancer()

    return {
      storeGlobalLoading
    }
  }
});
</script>
