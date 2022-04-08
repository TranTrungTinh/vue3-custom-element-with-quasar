<template>
  <q-item
    v-ripple
    clickable
    class="q-pa-none"
    @click="selected(item)"
  >
    <q-item-section v-if="type === 'LOGO'">
      <p class="text-caption q-my-xs q-ml-sm">
        {{ item.name }}
      </p>
      <q-img :src="item.url" />
      <div class="row items-center q-px-sm">
        <span class="text-small">あり</span>
        <q-toggle
          color="primary"
          v-model="valueData"
        />
        <span class="text-small">なし</span>
      </div>
    </q-item-section>
    <q-img
      v-else
      fit="fill"
      style="height: 100%; max-width: 200px"
      :src="item.url"
    />
  </q-item>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
  emits: ['selected'],
  setup (_, { emit }) {
    return {
      valueData: ref(false),
      selected: (item) => {
        emit('selected', item)
      }
    }
  }
});
</script>
