<script setup>
import {
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from "vue";
import MyButton from "./components/UI/MyButton.vue";
import PostItem from "./components/PostItem.vue";
import PostsList from "./components/PostsList.vue";
import PostForm from "./components/PostForm.vue";

// const posts = reactive([]);
const posts = ref([
  // { id: 1, title: "JavaScript 1", body: "Learn JS 1" },
  // { id: 2, title: "JavaScript 2", body: "Learn JS 2" },
  // { id: 3, title: "JavaScript 3", body: "Learn JS 3" },
  // { id: 4, title: "JavaScript 4", body: "Learn JS 4" },
]);
// const post = ref({ title: "", body: "" });

function createPost(post) {
  const newPost = {
    id: Date.now(),
    title: post.title,
    body: post.body,
  };
  posts.value.push(newPost);
  post.title = "";
  post.body = "";
  // console.log(post);
}

async function getPosts() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    posts.value = [...(await response.json())];
    // console.log(posts.value);
    return posts.value;
  } catch (e) {
    console.log(e);
  }
}

// watch(posts.value, (newPosts) => {
//   // console.log(newPosts);
//   // console.log(posts.value);
// });
onMounted(() => {
  setTimeout(() => {
    getPosts();
  }, 1000);
});
</script>

<template>
  <div class="app">
    <post-form @create="createPost" />
    <my-button @click="getPosts" style="margin-left: auto">Get posts</my-button>
    <!-- <component :is="PostsList" :posts="posts"></component> -->
    <posts-list :posts="posts" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
