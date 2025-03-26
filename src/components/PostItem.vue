<script setup>
import { inject } from "vue";
import { usePostsStore } from "../store/PostsStore";
// import MyButton from "./UI/MyButton.vue";

// const getPostId = inject("getPostId");
const deletedPost = inject("deletedPost");

const props = defineProps({
  id: Number || Date,
  title: String,
  body: String,
});

const postsStore = usePostsStore();
</script>

<template>
  <div class="post__content">
    <div>
      <div>
        <strong>Id:</strong> {{ props.id }} <strong>Title:</strong>
        {{ props.title }}
      </div>
      <div><strong>Body:</strong> {{ props.body }}</div>
    </div>
    <div style="margin-left: auto">
      <my-button @click="$router.push(`/posts/${props.id}`)">Open</my-button>
      <my-button
        style="margin-left: 10px"
        @click="postsStore.deletedPost(props)"
        >Delete</my-button
      >
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.post__content {
  padding: 10px;
  /* border-radius: 5%; */
  border-radius: 15px;
  /* border-top-left-radius: 15%; */
  /* border-bottom-right-radius: 15%; */
  border: 3px solid teal;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
}
</style>
