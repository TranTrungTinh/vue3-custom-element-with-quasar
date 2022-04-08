<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Layout,
  ToolBar,
  TryOn,
  FavoriteList,
  FavoriteManage,
  GModel,
  GFrame,
  GRimTemple,
  GLens,
  GLogo,
} from "@/components";
import { GDialog } from "gitart-vue-dialog";
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
    FavoriteManage,
  },
  setup(props, { expose }) {
    // *: Define var
    const currentConfig = ref<string | boolean>("");
    const isShow = ref(false);
    const isFrame = ref(false);
    // TODO: for favorite manage
    const isShowEdit = ref(false);
    const favorState = ref('');

    // *: Define use
    const { toast, actions, actionTypes, favoriteState, storeFavorites, storeGlobalLoading } =
      useEnhancer();

    // *: Define method & emit
    function showConfigType(type) {
      currentConfig.value = type;
      isShow.value = true;
    }
    function closeConfig() {
      currentConfig.value = false;
      isShow.value = false;
    }

    function showEdit() {
      isShowEdit.value = true;
      controllState(favoriteState.ADD_NEW)
    }
    function closeEdit() {
      isShowEdit.value = false;
      controllState()
    }
    function doFavorite(name) {
      toast.success(`「${name}」を上書き保存しました`);
      storeFavorites.add(name);
      closeEdit()
    }
    function controllState(state = '') {
      favorState.value = state
    }
    function onDelete() {
      const name = storeFavorites?.currentItem?.name ?? ''
      storeFavorites.removeCurrent()
      toast.success(`「${name}」を上書き保存しました`);
      closeEdit()
    }
    function onChangeFileName(value: string) {
      storeFavorites.editCurrent(value)
      const name = storeFavorites?.currentItem?.name ?? ''
      toast.success(`「${name}」に変更しました`);
      closeEdit()
    }
    function onSelectedChange(id: string) {
      isShowEdit.value = true;
      if (id !== storeFavorites.currentId) {
        controllState(favoriteState.CONFIRM_OVERRIDE)
      } else {
        controllState(favoriteState.SELECTED_CHANGE)
      }
    }
    function addToCart() {
      storeGlobalLoading.start();
      setTimeout(() => {
        storeGlobalLoading.end();
      }, 1000);
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
      favorState,
      isShowEdit,
      showEdit,
      closeEdit,
      showConfigType,
      currentConfig,
      closeConfig,
      doFavorite,
      addToCart,
      onSelectedChange,
      onDelete,
      controllState,
      onChangeFileName
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
        <q-scroll-area style="height: 50px" class="full-width">
          <div
            class="row no-wrap q-gutter-sm items-center q-px-sm"
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

        <favorite-list @selected="onSelectedChange">
          <q-btn color="primary" flat class="text-caption text-weight-medium" @click="showEdit">
            新規作成
          </q-btn>
        </favorite-list>

        <div class="row bg-white q-pa-sm">
          <div class="col-4">
            <q-btn
              color="primary"
              outline
              class="text-caption"
              label="保存"
              @click="showEdit"
            />
          </div>
          <div class="col-4">
            <span class="text-caption">￥40,000(税込)</span>
          </div>
          <div class="col-4 text-right">
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
      content-class="dialog-blur"

    >
      <g-model
        v-if="currentConfig === actionTypes.MODEL"
        :key="actionTypes.MODEL"
        @back="closeConfig"
      />
      <g-frame
        v-else-if="currentConfig === actionTypes.FRAME"
        :key="actionTypes.FRAME"
        @back="closeConfig"
      />
      <g-rim-temple
        v-else-if="currentConfig === actionTypes.RIM_TEMPLE"
        :key="actionTypes.RIM_TEMPLE"
        @back="closeConfig"
      />
      <g-lens
        v-else-if="currentConfig === actionTypes.LENS"
        :key="actionTypes.LENS"
        @back="closeConfig"
      />
      <g-logo
        v-else-if="currentConfig === actionTypes.LOGO"
        :key="actionTypes.LOGO"
        @back="closeConfig"
      />
    </g-dialog>
    <g-dialog v-model="isShowEdit" width="100%" local content-class="dialog-white">
      <favorite-manage 
        :state="favorState" 
        :key="isShowEdit" 
        @ok="doFavorite" 
        @change="controllState"
        @change-name="onChangeFileName"
        @delete="onDelete"
      />
    </g-dialog>
  </Layout>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
