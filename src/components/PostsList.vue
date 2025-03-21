<script setup>
import PostItem from "./PostItem.vue";

const { posts } = defineProps({
  posts: Array,
});
</script>

<template>
  <div>
    <h1 v-if="posts.length === 0" style="color: red; text-transform: uppercase">
      Post`s list is empty
    </h1>
    <h1 v-else>Post`s list</h1>
    <div class="post">
      <div v-for="post in posts" :key="post.id">
        <post-item :="post" />
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
