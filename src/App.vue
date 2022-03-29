<script>
import { defineComponent, ref } from 'vue'
import Layout from '@/layout/default.vue'
import ToolBar from '@/components/ToolBar.vue'
// import { GDialog } from 'gitart-vue-dialog'
import { useToast } from "vue-toastification";

export default defineComponent({
  components: {
    Layout,
    ToolBar
  },
  setup (props, { expose }) {
    const text = ref('Test App work')
    const isShow = ref(false)
    const toast = useToast();
    
     function showModal () {
      isShow.value = true
    }
    function closeModal () {
      isShow.value = false
    }

    expose({
      logText: () => {
        console.info(text)
      }
    })

    return {
      text,
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
      <tool-bar />
    </template>
    <q-btn
      label="Card"
      color="primary"
      @click="showModal"
    />
    <q-btn
      color="primary"
      icon="mail"
      label="On Left"
      @click="triggerPositive"
    />
    <q-btn
      color="secondary"
      icon-right="mail"
      label="On Right"
    />
    <q-btn
      color="red"
      icon="mail"
      icon-right="send"
      label="On Left and Right"
    />
    <h1>{{ text }}</h1>
  </Layout>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
