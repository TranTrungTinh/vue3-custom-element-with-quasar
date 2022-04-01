<template>
  <q-item
    v-ripple
    clickable
    class="q-pa-none"
  >
    <q-item-section v-if="type === 'LOGO'">
      <p class="text-caption q-my-xs q-ml-sm">
        {{ item.name }}
      </p>
      <q-img :src="item.url" />
      <q-toggle
        color="blue"
        label="Blue"
      />
    </q-item-section>
    <q-img
      v-else
      :src="item.url"
    />
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardItem",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    type: {
      type: String,
      default: () => "",
    },
  },
});
</script>
