<template>
  <div class="navbar">
    <h1>VUE 3</h1>
    <my-button @click="$router.push('/posts')">Posts</my-button>
    <my-button @click="$router.push('/')">Main</my-button>
    <my-button @click="$router.push('/about')">About</my-button>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar {
  background-color: chocolate;
  display: flex;
}
</style>
