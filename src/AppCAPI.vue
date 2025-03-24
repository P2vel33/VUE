<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
