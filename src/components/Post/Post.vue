<script lang="ts">
export default {
  name: 'Post',
}
</script>

<script setup lang="ts">
import editIcon from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/delete.svg";

defineEmits(['edit', 'delete'])

defineProps({
  title: {
    type: String,
    default: null
  },
  content: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="post">
    <div class="post__header">
      <h2>{{ title }}</h2>

      <div>
        <button class="post__edit" @click="$emit('edit')">
          <img :src="editIcon" alt="edit">
        </button>
        <button class="post__delete" @click="$emit('delete')">
          <img :src="deleteIcon" alt="delete">
        </button>
      </div>


    </div>
    <p>{{ content }}</p>
  </div>
</template>

<style lang="scss" src="./Post.scss"/>
