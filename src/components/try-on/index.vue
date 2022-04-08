<script lang="ts">
import { shadowBody } from "@/utils/build";
import { scriptsLoader } from "@/utils/scripts-loader";
import { defineComponent, nextTick, Ref, ref, watch } from "vue";
import { useMousePressed } from '@vueuse/core'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default defineComponent({
  name: "TryOn",
  components: {
    // RimlessIcon,
    // FrameIcon,
  },
  props: {
    isFrame: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  setup(props) {
    const isScriptsLoaded = ref(false);
    const container: Ref<HTMLElement | null> = ref(null);
    const glassesCanvasEl: Ref<HTMLElement | null> = ref(null);
    let glassesView: GlassesView | null = null;

    const { pressed } = useMousePressed({ target: glassesCanvasEl })

    watch(
      () => props.isFrame,
      (isFrame) => {
        nextTick(() => loadGlassOn(isFrame));
      }
    );

    const loadGlassOn = async (isFrame: boolean) => {
      glassesCanvasEl.value?.setAttribute("width", container.value?.clientWidth.toString() ?? "");
      glassesCanvasEl.value?.setAttribute("height", container.value?.clientHeight.toString() ?? "");
      glassesView = isFrame //
        ? new TryOnView("jeeFaceFilterCanvas", shadowBody()?.getRootNode() as any)
        : new GlassesView("jeeFaceFilterCanvas", shadowBody()?.getRootNode() as any);
      await glassesView.start();
      await glassesView.tryGlasses("https://production-glasson.s3.ap-northeast-1.amazonaws.com/libs/skgface/model/helloo/nicole.zip", "3D");
    };

    watch(pressed, (value) => {
      if (value) {
        disableBodyScroll(document.body)
      } else {
        clearAllBodyScrollLocks()
      }
    })

    // *: Attach scripts loaders
    const scripts = ["https://production-glasson.s3.ap-northeast-1.amazonaws.com/libs/skgface/tryon_core/tryon_core.min.js"];
    scriptsLoader
      .reset()
      .addScript(scripts)
      .afterLoad()
      .onComplete(() => {
        // console.info("ALL SCRIPTS LOADED");
        isScriptsLoaded.value = true;
        nextTick(() => loadGlassOn(props.isFrame));
      })
      .load();

    return {
      isScriptsLoaded,
      container,
      glassesCanvasEl
    };
  },
});
</script>

<template>
  <section v-if="isScriptsLoaded" class="go-main">
    <!-- <frame-icon v-if="isFrame" class="go-main--icon" /> -->
    <!-- <rimless-icon v-else class="go-main--icon" /> -->
    <div v-if="isFrame" ref="container" class="container">
      <canvas id="jeeFaceFilterCanvas" ref="glassesCanvasEl" />
      <video id="video" playsinline style="display: none" />
    </div>
    <div v-else ref="container" class="container">
      <canvas id="jeeFaceFilterCanvas" ref="glassesCanvasEl" />
    </div>
  </section>
  <div v-else class="row go-main items-center">
    <q-card flat class="full-width">
      <q-skeleton height="180px" square />
      <q-card-section>
        <q-skeleton type="text" class="text-subtitle1" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
      </q-card-section>
    </q-card>
  </div>
</template>
