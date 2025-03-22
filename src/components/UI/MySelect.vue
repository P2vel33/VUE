<!-- <script setup>
const props = defineProps({
  sortOptions: Array,
  default: () => [],
});


</script>

<template>
  <select @change="(e) => checkSort(e.target.value)">
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

<style scoped></style> -->
