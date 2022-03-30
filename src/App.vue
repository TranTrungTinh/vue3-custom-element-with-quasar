<script>
import { defineComponent, ref } from 'vue'
import Layout from '@/layout/default.vue'
import ToolBar from '@/components/ToolBar.vue'
// import { GDialog } from 'gitart-vue-dialog'
import SidePanel from '@/components/ui/slider/SidePanel.vue';
import FrameIcon from '@/assets/svg/boy-eyeglasses.svg?component'
import RimlessIcon from '@/assets/svg/eye-glasses.svg?component'
import { GModel } from '@/components/customization'
import { useToast } from "vue-toastification";

export default defineComponent({
  components: {
    Layout,
    ToolBar,
    SidePanel,
    FrameIcon,
    RimlessIcon,
    GModel
  },
  setup (props, { expose }) {
    const text = ref('Test App work')
    const isShow = ref(false)
    const isFrame = ref(false)
    const toast = useToast();

     function showModal () {
      isShow.value = true
    }
    function closeModal () {
      isShow.value = false
    }

    expose({
      logText: () => {
        // console.info(text)
      }
    })

    return {
      text,
      isFrame,
      isShow,
      showModal,
      closeModal,
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
              class="text-caption"
              label="モデル"
              color="primary"
              dense
              outline
              padding="xs md"
              no-wrap
              @click="showModal"
            />
            <q-btn
              class="text-caption"
              color="primary"
              dense
              padding="xs md"
              outline
              label="フレーム"
              no-wrap
              @click="triggerPositive"
            />
            <q-btn
              class="text-caption"
              color="secondary"
              padding="xs md"
              dense
              outline
              label="リム・テンプル(カラー)"
              no-wrap
              @click="closeModal"
            />
            <q-btn
              class="text-caption"
              color="secondary"
              padding="xs md"
              dense
              outline
              label="レンズ"
              no-wrap
            />
            <q-btn
              class="text-caption"
              color="secondary"
              padding="xs md"
              dense
              outline
              label="ロゴ"
              no-wrap
            />
          </div>
        </q-scroll-area>

        <q-scroll-area
          style="height: 66px;"
          class="full-width go-bg2"
        >
          <div
            class="row no-wrap q-gutter-sm items-center q-px-sm"
            style="height: 66px"
          >
            <div>
              <q-btn
                color="primary"
                round
                outline
                size="10px"
              >
                保存1
              </q-btn>
            </div>
            <div class="column items-center justify-end full-height">
              <q-btn
                color="primary"
                round
                size="10px"
              >
                保存2
              </q-btn>
              <span>
                <q-badge
                  color="blue"
                  rounded
                />
              </span>
            </div>
          </div>
        </q-scroll-area>
        <div class="row bg-white q-py-sm">
          <div class="col-4 text-center">
            <q-btn
              color="red"
              icon="favorite"
              padding="xs md"
              dense
              outline
              class="text-caption"
              label="保存"
            />
          </div>
          <div class="col-4 text-center">
            <span class="text-caption">￥40,000(税込)</span>
          </div>
          <div class="col-4 text-center">
            <q-btn
              icon="shopping_cart"
              color="primary"
              padding="xs md"
              class="text-caption"
              dense
              label="カート"
            />
          </div>
        </div>
      </section>
      <side-panel
        v-model="isShow"
        no-close
        hide-close-btn
        side="bottom"
        height="200px"
      >
        <g-model />
      </side-panel>
    </template>
  </Layout>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
