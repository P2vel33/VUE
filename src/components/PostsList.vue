<script setup>
import { TransitionGroup } from "vue";
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
      <TransitionGroup name="post-list">
        <div v-for="post in posts" :key="post.id">
          <post-item :="post" />
        </div>
      </TransitionGroup>
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

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
