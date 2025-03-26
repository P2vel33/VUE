import { defineStore } from "pinia";
import { computed, ref } from "vue";
import usePosts from "../hooks/usePosts";

export const usePostsStore = defineStore("postsStore", () => {
  const isVisiable = ref(false);
  const selectedSort = ref("");
  const search = ref("");
  const observer = ref(null);
  const sortOptions = [
    { value: "title", name: "Sort of title" },
    { value: "body", name: "Sort of body" },
    { value: "id", name: "Sort of id" },
  ];
  const limit = ref(10);
  const page = ref(1);
  const { posts, isLoading, totalPages, fetchPosts } = usePosts(limit, page);

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

  const searchAndSortedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.includes(search.value)
    );
  });

  const createPost = (post) => {
    posts.value.push({ ...post, id: Date.now() });
  };

  const deletedPost = (post) => {
    posts.value = [...posts.value].filter((elem) => elem.id !== post.id);
  };

  // const checkSort = (value) => {
  //   if (value !== "id") {
  //     posts.value = [...posts.value].sort((post1, post2) =>
  //       post1[value]?.localeCompare(post2[value])
  //     );
  //   } else {
  //     posts.value = [...posts.value].sort(
  //       (post1, post2) => post1[value] - post2[value]
  //     );
  //   }
  // };

  const loadMorePosts = async () => {
    try {
      page.value += 1;
      const params = new URLSearchParams({
        _limit: limit.value,
        _page: page.value,
      }).toString();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${params}`
      );
      if (!response.ok) {
        throw new Error("Сеть не отвечает");
      }
      const data = await response.json();
      posts.value = [...posts.value, ...data];
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    } finally {
    }
  };

  return {
    isVisiable,
    selectedSort,
    search,
    observer,
    sortOptions,
    limit,
    page,
    posts,
    isLoading,
    totalPages,
    fetchPosts,
    sortedPosts,
    searchAndSortedPosts,
    createPost,
    deletedPost,
    // checkSort,
    loadMorePosts,
  };
});
