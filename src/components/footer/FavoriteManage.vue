<template>
  <template v-if="state === favoriteState.ADD_NEW">
    <div class="q-ma-md">
      <p class="text-black text-caption text-weight-medium q-mb-sm">
        保存名を入力
      </p>
      <q-input 
        ref="inputRef" 
        v-model="text" 
        class="full-width q-pb-sm" 
        outlined 
        dense 
        :rules="[
          val => !!val || 'フィールドは必須項目です',
          val => val.length <= 5 || '最大5文字を使用してください'
        ]" 
      />
      <div class="row justify-end">
        <q-btn color="primary" outline class="text-caption text-weight-medium" @click="onSubmit">
          決定
        </q-btn>
      </div>
    </div>
  </template>
  <template v-else-if="state === favoriteState.SELECTED_CHANGE">
    <div
      class="row full-height q-gutter-y-md items-center q-px-lg q-py-lg"
    >
      <q-btn
        color="primary"
        outline
        label="カートに入れる"
        class="full-width"
      />
      <q-btn
        color="primary"
        label="編集する"
        outline
        class="full-width"
      />
      <q-btn
        color="primary"
        outline
        label="名前を変更"
        class="full-width"
        @click="changeState(favoriteState.CHANGE_NAME)"
      />
      <q-btn
        color="primary"
        outline
        label="削除する"
        class="full-width"
        @click="changeState(favoriteState.CONFIRM_DELETE)"
      />
      <q-btn
        color="primary"
        flat
        label="戻る"
        class="full-width"
      />
    </div>
  </template>
  <template v-else-if="state === favoriteState.CONFIRM_DELETE">
    <div class="q-ma-md">
      <p class="text-black text-caption text-weight-medium q-mb-sm">
        本当に削除しますか？
      </p>
      <div class="row justify-between">
        <q-btn color="primary" style="width: 130px;" outline class="text-caption text-weight-medium" @click="changeState(favoriteState.SELECTED_CHANGE)">
          いいえ
        </q-btn>
        <q-btn color="primary" style="width: 130px;" outline class="text-caption text-weight-medium" @click="handleDelete">
          はい
        </q-btn>
      </div>
    </div>
  </template>
  <template v-else-if="state === favoriteState.CHANGE_NAME">
    <div class="q-ma-md">
      <p class="text-black text-caption text-weight-medium q-mb-sm">
        保存名を入力
      </p>
      <q-input 
        ref="inputRef" 
        v-model="text" 
        class="full-width q-pb-sm" 
        outlined 
        dense 
        :rules="[
          val => !!val || 'フィールドは必須項目です',
          val => val.length <= 5 || '最大5文字を使用してください'
        ]" 
      />
      <div class="row justify-end">
        <q-btn color="primary" flat class="text-caption text-weight-medium q-mr-sm" @click="changeState(favoriteState.SELECTED_CHANGE)">
          キャンセル
        </q-btn>
        <q-btn color="primary" outline class="text-caption text-weight-medium" @click="handleChangeName">
          決定
        </q-btn>
      </div>
    </div>
  </template>
  <template v-else-if="state === favoriteState.CONFIRM_OVERRIDE">
    <div class="q-ma-md">
      <p class="text-black text-caption text-weight-medium q-mb-sm">
        現在の編集内容を保存しますか？
      </p>
      <p class="text-black text-caption text-weight-medium q-mb-sm">これまでの変更が失われます。</p>
      <div class="row justify-between">
        <q-btn color="primary" style="width: 130px;" outline class="text-caption text-weight-medium" @click="changeState(favoriteState.SELECTED_CHANGE)">
          保存しない
        </q-btn>
        <q-btn color="primary" style="width: 130px;" outline class="text-caption text-weight-medium" @click="handleOverride">
          上書き保存
        </q-btn>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useEnhancer } from "@/enhancer";

export default defineComponent({
  name: 'FavoriteManage',
  props: {
    state: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  emits: ['ok', 'change', 'delete', 'changeName'],
  setup(_, { emit }) {
    const inputRef: AnyObject = ref(null)
    const text = ref('');

    const { favoriteState } = useEnhancer()

    function onSubmit() {
      const isEmpty =  inputRef.value.validate()
      if (!isEmpty) return
      emit('ok', text.value)
    }

    function changeState(state) {
      emit('change', state)
    }

    function handleDelete() {
      emit('delete')
    }

    function handleChangeName() {
      const isEmpty =  inputRef.value.validate()
      if (!isEmpty) return
      emit('changeName', text.value)
    }

    function handleOverride() {
      console.info('abc')
    }

    return {
      inputRef,
      text,
      onSubmit,
      handleDelete,
      favoriteState,
      changeState,
      handleChangeName,
      handleOverride
    }
  }
})
</script>
