<template>
  <card-scroll 
    title="レンズ"
    :list="list"
    @ok="handleOk"
    @cancle="handleBack"
  />
</template>

<script>
import { defineComponent, computed } from 'vue'
import CardScroll from '@/components/ui/card/CardHorizontalScroll.vue'
export default defineComponent({
  name: 'GoLens',
  components: { CardScroll },
  emits: ['ok', 'back'],
  setup (_, { emit }) {
    const handleBack = () => {
      emit('back')
    }

    const handleOk = () => {
      emit('ok', 'payload')
    }

    const list = computed(() => {
      return Array.from({ length: 38 }, (v, id) => ({
        id,
        text: '販売中',
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Color-Green.JPG'
      }))
    })

    
    return {
      list,
      handleBack,
      handleOk
    }
  }
})
</script>