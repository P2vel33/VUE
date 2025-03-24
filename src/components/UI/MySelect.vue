<script setup>
const props = defineProps({
  sortOptions: { type: Array, default: () => [] },
  selectedSort: String,
});
const emit = defineEmits(["update:selectedSort"]);
const selectSort = (event) => {
  emit("update:selectedSort", event.target.value);
};
</script>

<template>
  <select @change="(e) => selectSort(e)">
    <option disabled value="Change">Change meaning of sort</option>
    <option
      v-for="option in sortOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
select {
  border-radius: 5px;
}
</style>
