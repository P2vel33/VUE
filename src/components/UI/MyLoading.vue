<script setup>
// export default {
//   name: "my-loading",
// };
</script>
<template>
  <div class="loading">
    <div class="loader"></div>
    <!-- <div class="loading__content">posts</div>
    <div class="loading__content">is</div>
    <div class="loading__content">loading</div> -->
  </div>
</template>

<style scoped>
.loading__content {
  border: 3px solid red;
  color: red;
  text-transform: uppercase;
  margin: auto;
  /* padding: auto; */
  font-size: xx-large;
  padding: 10px;
  width: 50%;
  text-align: center;
  align-content: center;
  height: 10%;
  transition: all 0.2s;
  transform: scale(1.2);
}

.loading {
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%;
  display: flex;
  flex-direction: column;
  position: fixed;
}

.loader {
  /* position: fixed;
  top: 0%;
  bottom: 0%;
  right: 0%;
  left: 0%; */
  margin: auto;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid teal; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
