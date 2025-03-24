import { computed, ref } from "vue";

export default function sortedPosts(posts) {
  console.log(posts);
  const selectedSort = ref("");
  const sortedPosts = computed(() => {
    if (selectedSort.value !== "id") {
      return [...posts.value].sort((post1, post2) =>
        post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
      );
    } else {
      return [...posts.value].sort(
        (post1, post2) => post1[selectedSort.value] - post2[selectedSort.value]
      );
    }
  });
  console.log(sortedPosts);
  return {
    selectedSort,
    sortedPosts,
  };
}
