<script>
import { defineComponent, ref } from 'vue'
import Layout from '@/layout/default.vue'
import { GDialog } from 'gitart-vue-dialog'

import ToolBar from '@/components/ToolBar.vue'
import FrameIcon from '@/assets/svg/boy-eyeglasses.svg?component'
import RimlessIcon from '@/assets/svg/eye-glasses.svg?component'
import { GModel, GFrame, GRimTemple, GLens, GLogo } from '@/components/customization'
import { FavoriteList } from '@/components/favorites'
import { useEnhancer } from '@/enhancer'

export default defineComponent({
  components: {
    Layout,
    ToolBar,
    GDialog,
    FrameIcon,
    RimlessIcon,
    GModel,
    GFrame,
    GRimTemple,
    GLens,
    GLogo,
    FavoriteList
  },
  setup (props, { expose }) {
    // *: Define var
    const currentConfig = ref('')
    const isShow = ref(false)
    const isFrame = ref(false)

    // *: Define use
    const { toast, actions, actionTypes, storeFavorites } = useEnhancer()

    // *: Define method & emit
    function showConfigType (type) {
      currentConfig.value = type
      isShow.value = true
    }
    function closeConfig () {
      currentConfig.value = false
      isShow.value = false
    }
    function doFavorite() {
      storeFavorites.add()
      toast.success("Add to favorite successfully");
    }

    // *: Define computed

    // *: Define watch

    // *: Define expose
    expose({
      logText: () => {
        // console.info(text)
      }
    })

    return {
      actions,
      actionTypes,
      isFrame,
      isShow,
      showConfigType,
      currentConfig,
      closeConfig,
      doFavorite,
      triggerPositive () {
        toast("I'm a toast!");
      }
    }
  }
})
</script>

<template>
  <Layout>
    <template #header>
      <tool-bar v-model="isFrame" />
    </template>
    <section class="go-main">
      <frame-icon
        v-if="isFrame"
        class="go-main--icon"
      />
      <rimless-icon
        v-else
        class="go-main--icon"
      />
    </section>
    <template #footer>
      <section class="go-functions">
        <q-scroll-area
          style="height: 50px;"
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
          style="height: 66px;"
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
      <div style="height: 35vh;">
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
