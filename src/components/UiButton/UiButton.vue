<script lang="ts">
export default {
  name: 'UiButton',
}
</script>

<script setup lang="ts">
defineEmits(['click'])

const props = defineProps({
  text: {
    type: String,
    default: null
  },
  hasIcon: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  iconColor: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: null
  },
})

const textColor = computed(() => {
  return props.color ? props.color : 'var(--black)'
})

const imageColor = computed(() => {
  return props.iconColor ? props.iconColor : 'var(--icon-color)'
})
</script>

<template>
  <button
    :class="{color: color}"
    @click="$emit('click')"
    class="ui-button"
  >
    {{ text }}
    <img :src="icon" :alt="alt" v-if="hasIcon">
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  font-weight: 600;
  color: v-bind(textColor);

  img {
    filter: v-bind(imageColor)
  }

  @media(max-width: 400px) {
      font-size: 12px;
    padding: 10px;

    img {
      width: 16px;
    }
  }
}
</style>
