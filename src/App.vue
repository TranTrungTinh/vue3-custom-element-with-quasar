<script>
import { defineComponent, ref } from 'vue'
import { GDialog } from 'gitart-vue-dialog'
export default defineComponent({
  components: {GDialog},
  setup (props, { expose }) {
    const text = ref('Test App work')
    
    const isShow = ref(false)

    function showModal () {
      isShow.value = true
    }
    function closeModal () {
      isShow.value = false
    }

    return {
      text,
      isShow,
      showModal,
      closeModal,
    }
  }
})
</script>

<template>
<div id="q-app">
  <q-btn label="Card" color="primary" @click="showModal" />
  <q-btn color="primary" icon="mail" label="On Left" />
  <q-btn color="secondary" icon-right="mail" label="On Right" />
  <q-btn color="red" icon="mail" icon-right="send" label="On Left and Right" />
  <h1>{{ text }}</h1>
  <GDialog local v-model="isShow">
    <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Cafe Basilico
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
          </div>
        </div>

        <q-rating :model-value="5" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          $・Italian, Cafe
        </div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Reserve" />
        <q-btn v-close-popup flat color="primary" round icon="event" />
      </q-card-actions>
    </q-card> 
  </GDialog>
</div>
</template>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
