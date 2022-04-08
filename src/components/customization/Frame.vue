<template>
  <div
    v-if="!mode"
    class="row full-height q-gutter-y-md items-center q-pa-md"
  >
    <q-btn
      color="primary"
      outline
      label="クリア - 透明"
      class="full-width"
    />
    <q-btn
      color="primary"
      label="クリア - カラー"
      outline
      class="full-width"
      @click="setMode('COLOR')"
    />
    <q-btn
      color="primary"
      outline
      label="クリア - イラスト"
      class="full-width"
      @click="setMode('IMAGE')"
    />
  </div>
  <card-scroll
    v-else
    :title="title"
    :ok-button="okTextButton"
    :list="list"
    @ok="handleOk"
    @cancle="handleBack"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import CardScroll from "@/components/ui/card/CardHorizontalScroll.vue";
export default defineComponent({
  name: "GoFrame",
  components: { CardScroll },
  emits: ["ok"],
  setup(_, { emit }) {
    const mode = ref("");
    const isSettingFront = ref(true)

    const setMode = (type) => {
      mode.value = type;
    };

    const handleBack = () => {
      if (!isSettingFront.value) {
        isSettingFront.value = true
      } else {
        mode.value = "";
      }
    };

    const handleOk = () => {
      if (isSettingFront.value) {
        isSettingFront.value = false
      } else {
        emit("ok", "payload");
      }
    };

    const title = computed(() => {
      const mapping = {
        COLOR: "クリア - カラー - ",
        IMAGE: "イラスト - ",
      };
      if (isSettingFront.value) {
        return mapping[mode.value] + '表面'
      }
      return mapping[mode.value] + '裏面';
    });

    const okTextButton = computed(() => {
      return isSettingFront.value ? '次へ' : "決定";
    });

    const list = computed(() => {
      if (mode.value === "COLOR") {
        return Array.from({ length: 28 }, (v, id) => ({
          id,
          text: "販売中",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzAt4XziBoZaAac8RRiQOwtUawBDnbPf25D4lZ2sD3NroIpzmmM6t4zPhWVVj-MV_Wqs&usqp=CAU",
        }));
      }
      if (mode.value === "IMAGE") {
        return Array.from({ length: 8 }, (v, id) => ({
          id,
          text: "販売中",
          url: "https://s3.cloud.cmctelecom.vn/tinhte2/2019/06/4677494_default-placeholder.png",
        }));
      }
      return [];
    });

    return {
      mode,
      setMode,
      title,
      okTextButton,
      list,
      handleBack,
      handleOk,
    };
  },
});
</script>
