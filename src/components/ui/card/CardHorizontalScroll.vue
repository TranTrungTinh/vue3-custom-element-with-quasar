<template>
  <q-card
    flat
    class="full-height"
  >
    <q-item dense>
      <q-item-section class="text-black text-caption text-weight-medium">
        {{ title }}
      </q-item-section>
    </q-item>
    <q-separator />
    <!-- height: calc(100% - 40px - 33px);  -->
    <q-scroll-area :style="{ '--vh': cardContainerHeight, 'height': 'var(--vh, 150px)', 'max-width': '100%' }">
      <div ref="cardContainer">
        <div v-show="!type">
          <div class="row no-wrap q-ma-sm">
            <q-card
              v-for="(item, index) in halfFirsts"
              :key="index"
              :class="['cartItem q-mr-sm', { 'bg-blue-grey-4': itemActive.id === item.id }]"
            >
              <card-item :item="item" @selected="onActive" />
            </q-card>
          </div>
          <div class="row no-wrap q-ma-sm">
            <q-card
              v-for="(item, index) in halfEnds"
              :key="index"
              :class="['cartItem q-mr-sm', { 'bg-blue-grey-4': itemActive.id === item.id }]"
            >
              <card-item :item="item" @selected="onActive" />
            </q-card>
          </div>
        </div>
        <div
          v-show="type"
          class="row no-wrap q-ma-sm"
        >
          <q-card
            v-for="(item, index) in renderList"
            :key="index"
            :class="['q-mr-sm', { 'bg-blue-grey-4': itemActive.id === item.id }]"
          >
            <card-item
              :type="type"
              :item="item"
              @selected="onActive" 
            />
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
        @click="handleBack"
      >
        戻る
      </q-btn>
      <q-btn
        outline
        dense
        size="12px"
        @click="handleOk"
      >
        {{ okButton }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, Ref, nextTick } from "vue";
import CardItem from "./CardItem.vue";

export default defineComponent({
  name: "CardScroll",
  components: {
    CardItem,
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "",
    },
    okButton: {
      type: String,
      default: () => "決定",
    },
    list: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  emits: ["cancle", "ok"],
  setup(props, { emit }) {
    const { list } = toRefs(props);
    const halfFirsts = computed(() =>
      list.value.slice(0, Math.round(list.value.length / 2))
    );
    const halfEnds = computed(() =>
      list.value.slice(Math.round(list.value.length / 2), list.value.length)
    );

    const itemActive: AnyObject = ref({})
    const cardContainerHeight = ref('180px')
    const cardContainer: Ref<HTMLElement | null> = ref(null);

    const onActive = item => {
      itemActive.value = item
    }

    const handleBack = () => {
      emit("cancle", "payload");
    };

    const handleOk = () => {
      emit("ok", "payload");
    };

    nextTick(() => {
      setTimeout(() => {
        const gutter = 24;
        cardContainerHeight.value = (cardContainer?.value?.clientHeight ?? 0) + gutter + 'px'
      }, 500)
    })

    return {
      handleBack,
      handleOk,
      renderList: list,
      halfFirsts,
      halfEnds,
      onActive,
      itemActive,
      cardContainer,
      cardContainerHeight
    };
  },
});
</script>
