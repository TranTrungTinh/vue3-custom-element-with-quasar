<template>
  <Layout>
    <App />
  </Layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/layouts/default.vue'
import App from '@/app/index.vue'

export default defineComponent({
  name: 'TheRoot',
  components: { Layout, App },
  props: {}
})
</script>

