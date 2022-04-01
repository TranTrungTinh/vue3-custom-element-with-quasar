<template>
  <div
    v-if="storeFavorites.favorites.length"
    class="row no-wrap q-gutter-sm items-center q-px-sm"
    style="height: 66px"
  >
    <div
      v-for="(item, index) in storeFavorites.favorites"
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
        size="10px"
        @click="selected(item.id)"
      >
        {{ item.name }}{{ index + 1 }}
      </q-btn>
      <span v-if="item.id === storeFavorites.currentId">
        <q-badge
          color="primary"
          rounded
        />
      </span>
    </div>
  </div>
  <div
    v-else
    class="column items-center justify-center"
    style="height: 66px"
  >
    <q-icon
      name="favorite_border"
      color="red"
    />
    <span class="text-caption">お気に入りなし</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEnhancer } from "@/enhancer";

export default defineComponent({
  name: "FavoriteList",
  setup() {
    const { storeFavorites } = useEnhancer();

    function selected(id) {
      storeFavorites.setSelected(id);
    }

    return {
      storeFavorites,
      selected,
    };
  },
});
</script>
a
