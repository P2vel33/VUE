<script setup>
import { ref } from "vue";
// import MyButton from "./UI/MyButton.vue";
// import MyInput from "./UI/MyInput.vue";

const props = defineProps({
  show: Boolean,
});
const post = ref({ title: "", body: "" });
const emit = defineEmits(["create", "update:show"]);
function createPost(post) {
  emit("update:show", false);
  emit("create", post);
  post.title = "";
  post.body = "";
}
</script>

<template>
  <div class="new_post">
    <my-input v-focus v-model="post.title" placeholder="Name" />
    <my-input v-model="post.body" placeholder="Description" />
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
