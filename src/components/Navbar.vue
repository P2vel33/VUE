<template>
  <div class="navbar">
    <h1>VUE 3</h1>
    <div class="navbar__content">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/')">Main</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/store')">Pinia</my-button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar {
  background-color: chocolate;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  /* gap: 10px; */

  /* position: sticky; */
}

.havbar__content {
  display: flex;
  justify-content: space-around;
}
</style>
