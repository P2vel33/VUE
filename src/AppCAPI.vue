<script setup>
import { onMounted, ref } from "vue";
import MyButton from "./components/UI/MyButton.vue";
import PostsList from "./components/PostsList.vue";
import PostForm from "./components/PostForm.vue";
import MyModal from "./components/UI/MyModal.vue";
import MyLoading from "./components/UI/MyLoading.vue";
// import usePosts from "./hooks/usePosts";

const posts = ref([]);
const isVisiable = ref(false);
const isLoading = ref(false);

function createPost(post) {
  posts.value.push({ ...post, id: Date.now() });
}

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    if (!response.ok) {
      throw new Error("Сеть не отвечает");
    }
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error);
  } finally {
    isLoading.value = false;
  }
};

const deletePost = (post) => {
  posts.value = [...posts.value].filter((elem) => elem.id !== post.id);
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
    <my-loading v-if="isLoading" />
    <posts-list
      v-else
      v-bind:posts="posts"
      @update:posts="(post) => deletePost(post)"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
