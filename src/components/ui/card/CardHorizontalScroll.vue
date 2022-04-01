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
    <q-scroll-area style="height: calc(100% - 40px - 33px); max-width: 100%">
      <template v-if="!type">
        <div class="row no-wrap q-ma-sm">
          <q-card
            v-for="(item, index) in halfFirsts"
            :key="index"
            class="cartItem q-mr-sm"
          >
            <card-item :item="item" />
          </q-card>
        </div>
        <div class="row no-wrap q-ma-sm">
          <q-card
            v-for="(item, index) in halfEnds"
            :key="index"
            class="cartItem q-mr-sm"
          >
            <card-item :item="item" />
          </q-card>
        </div>
      </template>
      <div
        v-else
        class="row no-wrap q-ma-sm"
      >
        <q-card
          v-for="(item, index) in renderList"
          :key="index"
          class="q-mr-sm"
        >
          <card-item
            :type="type"
            :item="item"
          />
        </q-card>
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
        決定
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
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

    const handleBack = () => {
      emit("cancle", "payload");
    };

    const handleOk = () => {
      emit("ok", "payload");
    };

    return {
      handleBack,
      handleOk,
      renderList: list,
      halfFirsts,
      halfEnds,
    };
  },
});
</script>
