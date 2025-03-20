<script setup></script>

<template>
  <button class="btn">
    <slot> </slot>
  </button>
</template>

<style scoped>
.btn {
  cursor: pointer;
  background: none;
  border: 3px solid teal;
  color: teal;
  padding: 10px;
  margin-left: auto;
}
</style>
