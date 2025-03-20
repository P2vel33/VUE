<script setup>
import MyButton from "./UI/MyButton.vue";

const props = defineProps({
  id: Number || Date,
  title: String,
  body: String,
});
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
      <my-button>Open</my-button>
      <my-button style="margin-left: 10px">Delete</my-button>
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
  border: 3px solid teal;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
}
</style>
