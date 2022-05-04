<script>
import { defineComponent, watch, reactive } from 'vue'
import { 
  Layout, 
  FavoriteList
} from '@/components'
import { useEnhancer } from '@/enhancer'
import { parseInputData, unProxify } from '@/transforms/object'
export default defineComponent({
  name: 'App',
  components: {
    Layout,
    FavoriteList
  },
  props: {
    inputdata: {
      type: String,
      default: () => ''
    }
  },
  emits: ['favoriteListUpdated', 'addToCart'],
  setup (props, { emit }) {

    const watcher = reactive(props)
    // *: Define use
    const { storeFavorites } = useEnhancer()

    // *: Define computed

    // *: Define watch & method
    function doFavorite() {
      emit('favoriteListUpdated', unProxify(storeFavorites.list))
    }

    const doAddToCart = () => {
      const glassesVariant = storeFavorites.list[0]
      const price = Math.floor(Math.random() * 10000) + 1
      
      emit('addToCart', {
        glassesVariant: unProxify(glassesVariant),
        price: Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price)
      })
    }

    watch(watcher, () => {
      const data = parseInputData(props.inputdata)
      if (data) {
        storeFavorites.set(data.favoriteList)
      }
    }, { immediate: true })

    return {
      doFavorite,
      doAddToCart
    }
  }
})
</script>

<template>
  <Layout>
    <section class="go-main">
      <favorite-list />
    </section>
    <template #footer>
      <section class="go-functions">
        <div class="row bg-white q-py-sm justify-between">
          <div class="col-4 text-center">
            <q-btn
              color="primary"
              outline
              class="text-caption"
              label="保存"
              @click="doFavorite"
            />
          </div>
          <div class="col-4 text-center">
            <q-btn
              icon="shopping_cart"
              color="primary"
              class="text-caption"
              label="カート"
              @click="doAddToCart"
            />
          </div>
        </div>
      </section>
    </template>
  </Layout>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
