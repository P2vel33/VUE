<script setup>
import { ref } from "vue";
import MyButton from "./UI/MyButton.vue";

const post = ref({ title: "", body: "" });
const emit = defineEmits(["create"]);
function createPost(post) {
  emit("create", post);
}
</script>

<template>
  <div class="new_post">
    <input v-model="post.title" type="text" placeholder="Name" />
    <input v-model="post.body" type="text" placeholder="Description" />
    <my-button @click="createPost(post)" style="margin-left: auto"
      >Create post
    </my-button>
  </div>
</template>

<style scoped>
.new_post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 10px;
}

input {
  height: 20px;
}
</style>
