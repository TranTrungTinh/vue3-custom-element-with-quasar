<template>
  <div
    v-if="!mode"
    class="row full-height items-center q-col-gutter-md q-px-md"
  >
    <div class="col-6">
      <q-card class="q-pa-none">
        <q-item
          v-ripple
          clickable
          @click="setMode('FRAME')"
        >
          <q-item-section>
            <q-img
              src="https://cdn-icons-png.flaticon.com/512/3721/3721763.png"
            />
            <p class="text-caption text-center q-mb-none">
              フレイム
            </p>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <div class="col-6">
      <q-card class="q-pa-none">
        <q-item
          v-ripple
          clickable
          @click="setMode('RIMLESS')"
        >
          <q-item-section>
            <q-img
              src="https://cdn-icons-png.flaticon.com/512/149/149456.png"
            />
            <p class="text-caption text-center q-mb-none">
              リムレス
            </p>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
  <card-scroll
    v-else
    :title="title"
    :list="list"
    @ok="handleOk"
    @cancle="handleBack"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import CardScroll from "@/components/ui/card/CardHorizontalScroll.vue";
export default defineComponent({
  name: "GoModal",
  components: { CardScroll },
  emits: ["ok"],
  setup(_, { emit }) {
    const mode = ref("");

    const setMode = (type) => {
      mode.value = type;
    };

    const handleBack = () => {
      mode.value = "";
    };

    const handleOk = () => {
      emit("ok", "payload");
    };

    const title = computed(() => {
      const mapping = {
        FRAME: "フレイム",
        RIMLESS: "リムレス",
      };
      return mapping[mode.value] ?? "";
    });

    const list = computed(() => {
      if (mode.value === "FRAME") {
        return Array.from({ length: 28 }, (v, id) => ({
          id,
          text: "販売中",
          url: "https://cdn-icons-png.flaticon.com/512/3721/3721763.png",
        }));
      }
      if (mode.value === "RIMLESS") {
        return Array.from({ length: 8 }, (v, id) => ({
          id,
          text: "販売中",
          url: "https://cdn-icons-png.flaticon.com/512/149/149456.png",
        }));
      }
      return [];
    });

    return {
      mode,
      setMode,
      title,
      list,
      handleBack,
      handleOk,
    };
  },
});
</script>
