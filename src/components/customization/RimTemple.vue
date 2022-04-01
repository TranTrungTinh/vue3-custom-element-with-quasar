<template>
  <card-scroll
    title="リム・テンプル - カラー"
    :list="list"
    @ok="handleOk"
    @cancle="handleBack"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import CardScroll from "@/components/ui/card/CardHorizontalScroll.vue";
export default defineComponent({
  name: "GoRimTemple",
  components: { CardScroll },
  emits: ["ok", "back"],
  setup(_, { emit }) {
    const handleBack = () => {
      emit("back");
    };

    const handleOk = () => {
      emit("ok", "payload");
    };

    const list = computed(() => {
      return Array.from({ length: 38 }, (v, id) => ({
        id,
        text: "販売中",
        url: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/10/17/931876-4-navratri-2020-red.jpg",
      }));
    });

    return {
      list,
      handleBack,
      handleOk,
    };
  },
});
</script>
