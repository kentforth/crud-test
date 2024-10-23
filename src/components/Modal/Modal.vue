<script lang="ts">
export default {
  name: 'Modal',
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import UiButton from "@/components/UiButton/UiButton.vue";

const title = defineModel('title')
const description = defineModel('description')

const hasTitleError = ref(false)
const hasDescriptionError = ref(false)

defineEmits(['cancel', 'save'])

defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const isValid = computed(() => {
  return !(!title.value || !description.value)
})

watch(title, () => {
  if(title.value === '') {
    hasTitleError.value = true

    return
  }

  hasTitleError.value = false
})

watch(description, () => {
  if(description.value === '') {
    hasDescriptionError.value = true

    return
  }

  hasDescriptionError.value = false
})
</script>

<template>
  <div class="modal">
    <div class="modal__background" />

    <div class="modal__content">
        <form class="modal__form" @submit.prevent="$emit('save')">
          <div>
            <input
              v-model.trim="title"
              type="text"
              class="modal__input"
              :class="hasTitleError ? 'modal__input_error' : ''" placeholder="Название"
            >
            <p
              class="modal__form-error"
              :class="hasTitleError ? 'modal__form-error_visible' : ''">
              Введите название
            </p>
          </div>

          <div>
          <textarea
            v-model="description"
            rows="5"
            placeholder="Описание"
            class="modal__description"
            :class="hasDescriptionError ? 'modal__input_error' : ''"
          />
            <p
              class="modal__form-error"
              :class="hasDescriptionError ? 'modal__form-error_visible' : ''">
              Введите описание
            </p>
          </div>


          <div class="modal__buttons">
            <UiButton
              text="Отмена"
              color="var(--dark-grey100)"
              class="modal__cancel"
              @click="$emit('cancel')"
            />
            <UiButton
              text="Сохранить"
              color="var(--dark-grey100)"
              type="submit"
              class="modal__submit"
              :disabled="!isValid"
            />
          </div>
        </form>
      </div>
  </div>
</template>

<style lang="scss" src="./Modal.scss" />
