<script>
import { defineComponent, onUnmounted, watch, ref, computed, onMounted, nextTick } from 'vue';
// import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SidePanelCloseButton from './SidePanelCloseButton.vue';
import { shadowBody } from '@/utils/build'
export default defineComponent({
  name: 'VueSidePanel',
  components: {
    SidePanelCloseButton,
  },
  props: {
    idName: {
      type: String,
      default: 'vsp-container',
    },
    hideCloseBtn: {
      type: Boolean,
      default: false,
    },
    noClose: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      validator: value => ['top', 'right', 'bottom', 'left'].includes(value),
      default: 'right',
      required: true,
    },
    zIndex: {
      type: [Number, String],
      default: 99,
    },
    width: {
      type: String,
      default: 'auto',
    },
    height: {
      type: String,
      default: 'auto',
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    lockScrollHtml: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
    overlayColor: {
      type: String,
      default: 'black',
    },
    overlayOpacity: {
      type: Number,
      default: 0.5,
    },
    overlayDuration: {
      type: Number,
      default: 500,
    },
    panelColor: {
      type: String,
      default: 'white',
    },
    panelDuration: {
      type: Number,
      default: 300,
    },
    headerClass: {
      type: String,
      default: '',
    },
    bodyClass: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const panelDuration = ref(props.panelDuration);
    const panel = ref<HTMLElement | null>(null);
    const overlay = ref<HTMLElement | null>(null);
    const footer = ref<HTMLElement | null>(null);
    const header = ref<HTMLElement | null>(null);
    const body = ref<HTMLElement | null>(null);
    const footerHeight = ref(0);
    const bodyScrollHeight = ref(0);
    const headerHeight = ref(0);
    const panelHeight = ref(0);
    const windowHeight = ref(0);
    const zIndex = ref(0);
    const calculateRightSize = async () => {
      if (window?.innerHeight > 0) windowHeight.value = window.innerHeight;
      footerHeight.value = footer.value ? footer.value.clientHeight : 0;
      headerHeight.value = header.value ? header.value.clientHeight : 0;
      bodyScrollHeight.value = body.value ? body.value.scrollHeight : 0;
      panelHeight.value = panel.value ? panel.value.clientHeight : 0;
    };
    const closePanel = () => emit('update:modelValue', false);
    const lockUnlockHtml = (lock) => {
      if (!props.lockScrollHtml) return;
      if (lock) {
        shadowBody().style.overflow = 'hidden';
        return;
      }
      shadowBody().style.removeProperty('overflow');
    };
    const getMaxZIndex = () =>
      Math.max(
        ...Array.from(document.querySelectorAll('body *'), (el) =>
          parseFloat(window.getComputedStyle(el).zIndex),
        ).filter((zIndex) => !Number.isNaN(zIndex)),
        0,
      );
    onMounted(() => {
      zIndex.value = props.zIndex === 'auto' ? getMaxZIndex() : props.zIndex;
    });
    onUnmounted(() => {
      if (props.lockScroll) {
        // clearAllBodyScrollLocks();
        lockUnlockHtml(false);
      }
      window.removeEventListener('resize', calculateRightSize);
    });
    watch(
      () => props.side,
      () => {
        const savedValue = panelDuration.value;
        panelDuration.value = 0;
        setTimeout(() => {
          panelDuration.value = savedValue;
        }, 100);
      },
    );
    watch(
      () => [header.value, footer.value, props.height, props.width, props.side],
      () => {
        nextTick(() => calculateRightSize());
      },
    );
    watch(
      () => props.modelValue,
      (showed) => {
        if (!panel.value) return;
        if (showed) {
          if (props.lockScroll) {
            // disableBodyScroll(panel.value, { reserveScrollBarGap: true });
            lockUnlockHtml(true);
          }
          calculateRightSize();
          window.addEventListener('resize', calculateRightSize);
          return;
        }
        if (props.lockScroll) {
          setTimeout(() => {
            if (!panel.value) return;
            // enableBodyScroll(panel.value);
            lockUnlockHtml(false);
          }, panelDuration.value);
        }
        window.removeEventListener('resize', calculateRightSize);
      },
      { immediate: true },
    );
    const bodyHeight = computed(() => {
      if (!panelHeight.value) return;
      const panelMaxHeight = bodyScrollHeight.value + headerHeight.value + footerHeight.value;
      let height = panelHeight.value - headerHeight.value - footerHeight.value;
      if (['top', 'bottom'].includes(props.side) && props.height === 'auto') {
        height =
          windowHeight.value >= panelMaxHeight
            ? bodyScrollHeight.value
            : windowHeight.value - headerHeight.value - footerHeight.value;
      }
      return height;
    });
    const overlayStyles = computed(() => ({
      zIndex: zIndex.value,
      transitionDuration: `${props.overlayDuration}ms`,
      opacity: props.modelValue ? props.overlayOpacity : 0,
      backgroundColor: props.overlayColor,
      pointerEvents: !props.modelValue ? 'none' : 'all',
    }));
    const panelStyles = computed(() => ({
      width: ['left', 'right'].includes(props.side) ? props.width : undefined,
      maxWidth: '100%',
      ...(['top', 'bottom'].includes(props.side)
        ? {
            // minHeight: props.height,
            height: props.height,
            maxHeight: '100%',
          }
        : {}),
      zIndex: zIndex.value,
      backgroundColor: props.panelColor,
      transitionDuration: `${panelDuration.value}ms`,
      ...Object.assign({}, attrs.style),
    }));
    return {
      body,
      panel,
      overlay,
      overlayStyles,
      header,
      footer,
      closePanel,
      panelStyles,
      bodyHeight,
    };
  },
});
</script>

<template>
  <section :id="idName">
    <div
      class="vsp-wrapper"
      :class="[modelValue && 'vsp-wrapper--active']"
    >
      <div
        ref="overlay"
        class="vsp-overlay"
        :style="overlayStyles"
        @click="() => (noClose ? undefined : closePanel())"
      />
      <div
        ref="panel"
        class="vsp"
        :class="[`vsp--${side}-side`, $attrs.class]"
        :style="panelStyles"
      >
        <div
          v-if="!!$slots.header"
          ref="header"
          :class="[headerClass, 'vsp__header']"
        >
          <slot
            name="header"
            :close="closePanel"
          />
        </div>
        <div
          ref="body"
          :class="[bodyClass, 'vsp__body']"
          :style="{ height: `${bodyHeight}px` }"
        >
          <slot
            name="default"
            :close="closePanel"
          />
          <SidePanelCloseButton
            v-if="!hideCloseBtn"
            @close="closePanel"
          />
        </div>
        <div
          v-if="!!$slots.footer"
          ref="footer"
          :class="[footerClass, 'vsp__footer']"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </section>
</template>
