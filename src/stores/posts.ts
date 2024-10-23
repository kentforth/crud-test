import { defineStore } from "pinia";
import { IPost } from "@/types/posts";

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])

  function getPost (id: number) {
    return posts.value.find(el => el.id === id)
  }

  function getPosts (_posts: IPost[]) {
    posts.value = _posts
  }

  function editPost (_post: IPost, isEdit: boolean) {

    if (isEdit) {
      const post = posts.value.find(el => el.id === _post.id)

      if (post) {
        const index = posts.value.findIndex(el => el.id === post.id)
        posts.value[index].title = _post.title
        posts.value[index].body = _post.body
      }
    }
  }

  function addPost (_post: IPost) {
    const id = getLastId()

    const post = {
      id: id + 1,
      userId: id + 1,
      title: _post.title,
      body: _post.body
    }

    posts.value.unshift(post)
  }

  function getLastId () {
    return posts.value.reduce(
      (max, character) => (character.id > max ? character.id : max),
      posts.value[0].id
    );
  }

  function deletePost (id: number) {
    const post = posts.value.find(el => el.id === id)

    if (post) {
      posts.value = posts.value.filter(el => el.id !== post.id)
    }
  }

  return {
    posts,
    addPost,
    getPost,
    editPost,
    getPosts,
    deletePost
  }
})
