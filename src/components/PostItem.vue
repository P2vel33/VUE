<script setup>
import { ref } from "vue";
import MyButton from "./UI/MyButton.vue";

// MyButton;
const props = defineProps({
  id: Number || Date,
  title: String,
  body: String,
});
const post = ref(props);
</script>

<template>
  <div class="post__content">
    <div>
      <div>
        <strong>Id:</strong> {{ props.id }} <strong>Title:</strong>
        {{ post.title }}
      </div>
      <div><strong>Body:</strong> {{ post.body }}</div>
    </div>
    <my-button style="margin-left: auto">Delete</my-button>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.post__content {
  padding: 10px;
  border: 3px solid teal;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  /* justify-content: flex-end; */
  /* width: 100%; */
}
</style>
