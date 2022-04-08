<template>
<div class="row no-wrap">
  <slot />
  <q-scroll-area style="height: 66px; flex: 1;" class="go-bg2 flex-block">
    <div
      class="row no-wrap q-gutter-sm items-center q-px-sm"
      style="height: 66px"
    >
      <div
        v-for="(item) in storeFavorites.favorites"
        :key="item.id"
        :class="{
          'column items-center justify-end full-height':
            item.id === storeFavorites.currentId,
        }"
      >
        <q-btn
          color="primary"
          round
          no-wrap
          :outline="item.id !== storeFavorites.currentId"
          size="13px"
          @click="selected(item.id)"
        >
          <span class="text-small">
            {{ item.name }}
          </span>
        </q-btn>
        <span class="text-small" v-if="item.id === storeFavorites.currentId">
          セレクト
        </span>
      </div>
    </div>
  </q-scroll-area>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEnhancer } from "@/enhancer";

export default defineComponent({
  name: "FavoriteList",
  emits: ['selected'],
  setup(_, { emit }) {
    const { storeFavorites } = useEnhancer();

    function selected(id) {
      emit('selected', id)
    }

    return {
      storeFavorites,
      selected
    };
  },
});
</script>

