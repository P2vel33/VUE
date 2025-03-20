// export default function usePosts(posts) {
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts?_limit=10"
//       );
//       if (!response.ok) {
//         throw new Error("Сеть не отвечает");
//       }
//       const data = await response.json();
//       posts.value = data; // Получаем первые 10 постов
//     } catch (error) {
//       console.error("Ошибка при загрузке постов:", error);
//     }
//   };
//   fetchPosts();
//   return {
//     posts,
//   };
// }
