<script setup>
import { onMounted, ref } from "vue";
import MyButton from "./components/UI/MyButton.vue";
import PostsList from "./components/PostsList.vue";
import PostForm from "./components/PostForm.vue";
import MyModal from "./components/UI/MyModal.vue";
import usePosts from "./hooks/usePosts";

const posts = ref([]);
const isVisiable = ref(false);

function createPost(post) {
  posts.value.push({ ...post, id: Date.now() });
}

const fetchPosts = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    if (!response.ok) {
      throw new Error("Сеть не отвечает");
    }
    const data = await response.json();
    posts.value = data; // Получаем первые 10 постов
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error);
  }
};

const getPosts = () => {
  const arr = [
    { id: 5, title: "JavaScript 5", body: "Learn JS 5" },
    { id: 6, title: "JavaScript 5", body: "Learn JS 5" },
    { id: 7, title: "JavaScript 5", body: "Learn JS 5" },
    { id: 8, title: "JavaScript 5", body: "Learn JS 5" },
    { id: 9, title: "JavaScript 5", body: "Learn JS 5" },
  ];
  posts.value = [...arr];
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="app">
    <my-button @click="() => (isVisiable = true)">Create</my-button>
    <my-modal
      :isVisiable="isVisiable"
      @update:isVisiable="(newVisiable) => (isVisiable = newVisiable)"
    >
      <post-form
        @create="createPost"
        :isVisiable="isVisiable"
        @update:show="(newVisiable) => (isVisiable = newVisiable)"
      />
    </my-modal>
    <!-- <post-form @create="createPost" /> -->
    <!-- <my-button @click="fetchPosts" style="margin-left: auto"
      >Get posts</my-button
    > -->
    <posts-list v-bind:posts="posts" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
