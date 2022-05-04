<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Favorite List</q-toolbar-title>
    </q-toolbar>
    <q-scroll-area style="height: 500px; width: 100%;">
      <div
        v-for="(item, index) in storeFavorites.favorites"
        :key="index"
        class="q-pa-sm"
      >
        <q-item-section>
          <p>item {{ index + 1 }}</p>
          <pre>{{ item }}</pre>
        </q-item-section>
        <q-separator />
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useEnhancer } from '@/enhancer'

export default defineComponent({
  name: 'FavoriteList',
  setup() {
    const { storeFavorites } = useEnhancer()

    function selected(id) {
      storeFavorites.setSelected(id)
    }

    return {
      storeFavorites,
      selected
    }
  }
})
</script>a