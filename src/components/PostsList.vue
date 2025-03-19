<script setup>
import { ref, watch, watchEffect } from "vue";
import PostItem from "./PostItem.vue";

const props = defineProps({
  posts: Array,
  require: true,
});
// console.log(props.posts);
const posts = ref(props.posts);

console.log(posts.value);
</script>

<template>
  <div>
    <h1>Post`s list</h1>
    <div class="post">
      <div v-for="post in posts" :key="post.id">
        <post-item v-bind="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.post {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
