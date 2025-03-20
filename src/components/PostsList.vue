<script setup>
import PostItem from "./PostItem.vue";

const { posts } = defineProps({
  posts: Array,
});
</script>

<template>
  <div>
    <h1>Post`s list</h1>
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
