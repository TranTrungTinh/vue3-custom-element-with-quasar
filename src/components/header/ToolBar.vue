<template>
  <section class="go-toolbar absolute row">
    <div class="go-toolbar__segment shadow-1">
      <div
        v-ripple
        :class="[
          'segment--item relative-position q-pa-sm cursor-pointer',
          { 'bg-primary': modelValue },
        ]"
        @click="toggle(true)"
      >
        <frame-icon :class="['go-icon', { 'text-white': modelValue }]" />
      </div>
      <div
        v-ripple
        :class="[
          'segment--item relative-position q-pa-sm cursor-pointer',
          { 'bg-primary': !modelValue },
        ]"
        @click="toggle(false)"
      >
        <rimless-icon :class="['go-icon', { 'text-white': !modelValue }]" />
      </div>
    </div>
    <div class="q-ml-md">
      <q-badge
        color="primary"
        class="text-caption"
      >
        販売中
      </q-badge>
      <span class="text-caption q-ml-sm">モデル名</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FrameIcon, RimlessIcon } from "@/components";

export default defineComponent({
  name: "ToolBar",
  components: { FrameIcon, RimlessIcon },
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
      required: true,
    },
  },
  emits: ["update:modelValue"],

  setup(_, { emit }) {
    const toggle = (value) => {
      emit("update:modelValue", value);
    };

    return {
      toggle,
    };
  },
});
</script>
