<script lang="ts">
export default {
  name: 'Home',
}
</script>

<script setup lang="ts">
import addIcon from '@/assets/icons/add.svg'
import Post from "@/components/Post/Post.vue";
import { usePostsStore } from "@/stores/posts";
import { computed } from "vue";
import Modal from "@/components/Modal/Modal.vue";
import { IPost } from "@/types/posts";

const postsStore = usePostsStore()

const $api = inject('$api')

const isEdit = ref(false)
const hasModal = ref(false)

const currentPost = ref<IPost>({
  id: null,
  userId: null,
  title: null,
  body: null
})

const posts = computed(() => postsStore.posts)

onBeforeMount(() => {
  getPosts()
})

const getPosts = async () => {
  try {
    const posts = await $api.get("/posts")

    if (posts) {
      postsStore.getPosts(posts.data)
    }

  } catch (e) {
   throw new Error(e)
  }

}

const editPost = (id: number) => {
  hasModal.value = true
  isEdit.value = true
  document.documentElement.style.overflow = 'hidden'

  currentPost.value = postsStore.getPost(id)
  // postsStore.editPost(id)
}

const deletePost = async (id: number) => {
 postsStore.deletePost(id)
}

const addPost = () => {
  console.log('ADD')
}

const hideModal = () => {
  hasModal.value = false
  document.documentElement.style.overflow = 'visible'
}
</script>

<template>
  <div class="home">
    <h1>Список постов</h1>

    <button class="home__add" @click="addPost">
      <span>Добавить пост</span>
      <img :src="addIcon" alt="add">
    </button>

    <hr>

    <div class="home__posts">
      <Post
        v-for="post in posts"
        :title="post.title"
        :content="post.body"
        @edit="editPost(post.id)"
        @delete="deletePost(post.id)"
        class="home__post"
      />
    </div>

    <Modal
      v-if="hasModal"
      :is-edit="isEdit"
      @cancel="hideModal"
      v-model:title="currentPost.title"
      v-model:description="currentPost.body"
    />
  </div>
</template>

<style lang="scss" src="./Home.scss"/>
