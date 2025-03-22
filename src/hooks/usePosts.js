import { onMounted, ref } from "vue";

export default function usePosts(limit, page) {
  //   console.log(limit.value);
  const isLoading = ref(true);

  const posts = ref([]);
  const totalPages = ref(0);

  const fetchPosts = async () => {
    try {
      isLoading.value = true;
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
      totalPages.value = Math.ceil(
        response.headers.get("x-total-count") / limit.value
      );
      posts.value = data;
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(fetchPosts);

  return {
    posts,
    isLoading,
    totalPages,
    fetchPosts,
  };
}
