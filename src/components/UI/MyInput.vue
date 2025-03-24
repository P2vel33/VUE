<script setup>
const props = defineProps({
  modelValue: String || Number,
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input type="text" :value="props.modelValue" @input="updateValue" />
</template>

<style scoped>
input {
  width: 90%;
  border: 2px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>
