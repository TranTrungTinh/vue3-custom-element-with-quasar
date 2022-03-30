<template>
  <q-card
    flat
    class="full-height q-pt-md"
  >
    <div
      v-if="!mode"
      class="row full-height items-center q-col-gutter-md q-px-md"
    >
      <div class="col-6">
        <q-card class="q-pa-none">
          <q-item
            v-ripple
            clickable
            @click="setMode('A')"
          >
            <q-img src="https://cdn-icons-png.flaticon.com/512/3721/3721763.png" />
          </q-item>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="q-pa-none">
          <q-item
            v-ripple
            clickable
            @click="setMode('B')"
          >
            <q-img
              src="https://cdn-icons-png.flaticon.com/512/149/149456.png"
            />
          </q-item>
        </q-card>
      </div>
    </div>
    <template v-else>
      <q-item dense>
        <q-item-label class="text-black text-caption text-weight-medium">
          フレーム
        </q-item-label>
      </q-item>
      <q-separator />
      <q-scroll-area
        style="height: calc(100% - 36px - 32px); max-width: 100%"
      >
        <div
          class="row q-col-gutter-sm q-pa-sm"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="col-3"
          >
            <q-card class="q-pa-none">
              <q-badge>
                {{ item.text }}
              </q-badge>
              <q-item
                v-ripple
                clickable
              >
                <q-img
                  :src="item.url"
                />
              </q-item>
            </q-card>
          </div>
        </div>
      </q-scroll-area>
      <q-card-actions
        align="between"
        class="q-mt-auto"
      >
        <q-btn
          outline
          dense
          size="12px"
        >
          戻る
        </q-btn>
        <q-btn
          outline
          dense
          size="12px"
        >
          決定
        </q-btn>
      </q-card-actions>
    </template>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  setup () {
    const mode = ref('')

    const setMode = (type) => {
      mode.value = type
    }

    const list = computed(() => {
      if (mode.value === 'A') {
        return Array.from({ length: 28 }, (v, id) => ({
          id,
          text: '販売中',
          url: 'https://cdn-icons-png.flaticon.com/512/3721/3721763.png'
        }))
      }
      if (mode.value === 'B') {
        return Array.from({ length: 8 }, (v, id) => ({
          id,
          text: '販売中',
          url: 'https://cdn-icons-png.flaticon.com/512/149/149456.png'
        }))
      }
      return []
    })

    return {
      mode,
      setMode,
      list
    }
  }
})
</script>
