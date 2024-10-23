<script lang="ts">
export default {
  name: 'Home',
}
</script>

<script setup lang="ts">
import loader from '@/assets/icons/loader.svg'
import addIcon from '@/assets/icons/add.svg'
import { usePostsStore } from "@/stores/posts";
import { computed } from "vue";
import { IPost } from "@/types/posts";
import Post from "@/components/Post/Post.vue";
import Modal from "@/components/Modal/Modal.vue";
import UiButton from "@/components/UiButton/UiButton.vue";

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

  currentPost.value = JSON.parse(JSON.stringify(postsStore.getPost(id)))
}

const deletePost = async (id: number) => {
 postsStore.deletePost(id)
}

const addPost = () => {
  isEdit.value = false
  hasModal.value = true
  currentPost.value.title = null
  currentPost.value.body = null
}

const hideModal = () => {
  hasModal.value = false
  document.documentElement.style.overflow = 'visible'
}

const savePost = () => {
  hasModal.value = false
  document.documentElement.style.overflow = 'visible'



  if (isEdit.value) {
    postsStore.editPost(currentPost.value, isEdit.value)

    return
  }

  postsStore.addPost(currentPost.value)

}
</script>

<template>
  <div class="home">
    <h1>Список постов</h1>

    <UiButton
      alt="add"
      color="var(--dark-grey100)"
      text="Добавить пост"
      :icon="addIcon"
      :has-icon="true"
      class="home__add"
      @click="addPost"
    />

    <hr>

    <img :src="loader" alt="" class="home__loader" v-if="!posts.length">

    <div class="home__posts">
      <transition mode="out-in">
        <transition-group name="posts" tag="div" v-if="posts.length > 0">
          <Post
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
            :content="post.body"
            @edit="editPost(post.id)"
            @delete="deletePost(post.id)"
            class="home__post"
          />
        </transition-group>
      </transition>
    </div>

    <transition>
      <Modal
        v-if="hasModal"
        :is-edit="isEdit"
        @cancel="hideModal"
        @save="savePost"
        v-model:title="currentPost.title"
        v-model:description="currentPost.body"
      />
    </transition>
  </div>
</template>

<style lang="scss" src="./Home.scss"/>
