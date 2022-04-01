<template>
  <card-scroll
    title="ロゴ"
    :list="list"
    type="LOGO"
    @ok="handleOk"
    @cancle="handleBack"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import CardScroll from "@/components/ui/card/CardHorizontalScroll.vue";
export default defineComponent({
  name: "GoLogo",
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
      return Array.from({ length: 2 }, (v, id) => ({
        id,
        type: "LOGO",
        name: "裏面",
        url: "https://s3.cloud.cmctelecom.vn/tinhte2/2019/06/4677494_default-placeholder.png",
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
