<script setup>
const props = defineProps({
  isVisiable: Boolean,
});

const emit = defineEmits(["update:isVisiable"]);
function hideModal() {
  emit("update:isVisiable", false);
  console.log("WORK");
}
</script>

<template>
  <div class="dialog" v-if="isVisiable" @click="hideModal">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  position: fixed;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 15px;
  padding: 20px;
  min-width: 300px;
  min-height: 50px;
}
</style>
