import { defineStore } from "pinia";
import { IPost } from "@/types/posts";
import { computed } from "vue";

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])

  function getPost (id: number) {
    return posts.value.find(el => el.id === id)
  }

  function getPosts (_posts: IPost[]) {
    posts.value = _posts
    console.log('POSTS', posts.value)
  }

  function editPost (id: number, _post: IPost) {
    const post = posts.value.find(el => el.id === id)

    if (post) {
      const index = posts.value.findIndex(el => el.id === post.id)
      posts.value[index].title = _post.title
      posts.value[index].body = _post.body
    }
  }

  function deletePost (id: number) {
    const post = posts.value.find(el => el.id === id)

    if (post) {
      posts.value = posts.value.filter(el => el.id !== post.id)
      console.log('POSTS', posts.value)
    }
  }

  return {
    posts,
    getPost,
    editPost,
    getPosts,
    deletePost
  }
})
