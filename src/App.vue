<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Layout,
  ToolBar,
  GDialog,
  TryOn,
  FavoriteList,
  GModel,
  GFrame,
  GRimTemple,
  GLens,
  GLogo,
} from "@/components";
import { useEnhancer } from "@/enhancer";

export default defineComponent({
  components: {
    Layout,
    ToolBar,
    GDialog,
    TryOn,
    GModel,
    GFrame,
    GRimTemple,
    GLens,
    GLogo,
    FavoriteList,
  },
  setup(props, { expose }) {
    // *: Define var
    const currentConfig = ref<string | boolean>('');
    const isShow = ref(false);
    const isFrame = ref(false);

    // *: Define use
    const { toast, actions, actionTypes, storeFavorites, storeGlobalLoading } = useEnhancer();

    // *: Define method & emit
    function showConfigType(type) {
      currentConfig.value = type;
      isShow.value = true;
    }
    function closeConfig() {
      currentConfig.value = false;
      isShow.value = false;
    }
    function doFavorite() {
      storeFavorites.add();
      toast.success("お気に入りに正常に追加");
    }
    function addToCart() {
      storeGlobalLoading.start()
      setTimeout(() => {
        storeGlobalLoading.end()
      }, 1000)
    }

    // *: Define computed

    // *: Define watch

    // *: Define expose
    expose({
      logText: () => {
        // console.info(text)
      },
    });

    return {
      actions,
      actionTypes,
      isFrame,
      isShow,
      showConfigType,
      currentConfig,
      closeConfig,
      doFavorite,
      addToCart,
    };
  },
});
</script>

<template>
  <Layout>
    <template #header>
      <tool-bar v-model="isFrame" />
    </template>
    <try-on :is-frame="isFrame" />
    <template #footer>
      <section class="go-functions">
        <q-scroll-area
          style="height: 50px"
          class="full-width"
        >
          <div
            class="row no-wrap q-gutter-sm items-end q-px-sm"
            style="height: 50px"
          >
            <q-btn
              v-for="action in actions"
              :key="action.type"
              class="text-caption"
              :label="action.label"
              color="primary"
              dense
              outline
              padding="xs md"
              no-wrap
              @click="showConfigType(action.type)"
            />
          </div>
        </q-scroll-area>

        <q-scroll-area
          style="height: 66px"
          class="full-width go-bg2"
        >
          <favorite-list />
        </q-scroll-area>
        <div class="row bg-white q-py-sm">
          <div class="col-4 text-center">
            <q-btn
              color="primary"
              icon="favorite_border"
              outline
              class="text-caption"
              label="保存"
              @click="doFavorite"
            />
          </div>
          <div class="col-4 text-center">
            <span class="text-caption">￥40,000(税込)</span>
          </div>
          <div class="col-4 text-center">
            <q-btn
              icon="shopping_cart"
              color="primary"
              class="text-caption"
              label="カート"
              @click="addToCart"
            />
          </div>
        </div>
      </section>
    </template>
    <g-dialog
      v-model="isShow"
      width="100%"
      transition="custom-from-bottom-transition"
      local
    >
      <div style="height: 35vh">
        <g-model
          v-if="currentConfig === actionTypes.MODEL"
          @back="closeConfig"
        />
        <g-frame
          v-else-if="currentConfig === actionTypes.FRAME"
          @back="closeConfig"
        />
        <g-rim-temple
          v-else-if="currentConfig === actionTypes.RIM_TEMPLE"
          @back="closeConfig"
        />
        <g-lens
          v-else-if="currentConfig === actionTypes.LENS"
          @back="closeConfig"
        />
        <g-logo
          v-else-if="currentConfig === actionTypes.LOGO"
          @back="closeConfig"
        />
      </div>
    </g-dialog>
  </Layout>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
