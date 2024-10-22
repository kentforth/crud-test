<script lang="ts">
export default {
  name: 'Modal',
}
</script>

<script setup lang="ts">
const title = defineModel('title')
const description = defineModel('description')

defineEmits(['cancel'])

defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal__background" />

    <div class="modal__content">
      <form class="modal__form">
        <input type="text" class="modal__input" placeholder="Название" v-model.trim="title">
        <textarea placeholder="Описание" class="modal__description" v-model="description" rows="5"/>
        <div class="modal__buttons">
          <button class="modal__cancel" @click.prevent="$emit('cancel')">Отмена
          </button>
          <button class="modal__submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" src="./Modal.scss" />
