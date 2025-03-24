<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import PostsList from "../components/PostsList.vue";
import PostForm from "../components/PostForm.vue";
import usePosts from "../hooks/usePosts";
// import useSortedPosts from "./hooks/useSortedPosts";

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

// const { selectedSort, sortedPosts } = useSortedPosts(posts);
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
  return sortedPosts.value.filter((post) => post.title.includes(search.value));
});

const createPost = (post) => {
  posts.value.push({ ...post, id: Date.now() });
};

const deletedPost = (post) => {
  posts.value = [...posts.value].filter((elem) => elem.id !== post.id);
};

// const changePage = (pageNumber) => {
//   page.value = pageNumber;
// };

const checkSort = (value) => {
  if (value !== "id") {
    posts.value = [...posts.value].sort((post1, post2) =>
      post1[value]?.localeCompare(post2[value])
    );
  } else {
    posts.value = [...posts.value].sort(
      (post1, post2) => post1[value] - post2[value]
    );
  }
};

const loadMorePosts = async () => {
  try {
    page.value += 1;
    // isLoading.value = true;
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
    // totalPages.value = Math.ceil(
    //   response.headers.get("x-total-count") / limit.value
    // );
    posts.value = [...posts.value, ...data];
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error);
  } finally {
    // isLoading.value = false;
  }
};

onMounted(() => {
  // console.log(totalPages.value);
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      // console.log(totalPages.value);
      loadMorePosts();
    }
  };
  const run = new IntersectionObserver(callback, options);
  run.observe(observer.value);
});
// watch(page, () => {
//   fetchPosts();
// });

// watch(selectedSort, () => {
//   checkSort(selectedSort.value);
// });

provide("deletedPost", deletedPost);
</script>

<template>
  <div>
    <div class="head">
      <my-button @click="() => (isVisiable = true)">Create</my-button>
      <my-select
        :sortOptions="sortOptions"
        :selectedSort="selectedSort"
        @update:selectedSort="(value) => (selectedSort = value)"
      />
      <my-input v-focus placeholder="Search..." v-model="search"></my-input>
    </div>

    <my-modal
      :isVisiable="isVisiable"
      @update:isVisiable="(newVisiable) => (isVisiable = newVisiable)"
    >
      <post-form
        @create="createPost"
        :isVisiable="isVisiable"
        @update:show="(newVisiable) => (isVisiable = newVisiable)"
      />
    </my-modal>

    <my-loading v-if="isLoading" />
    <div v-else>
      <posts-list v-bind:posts="searchAndSortedPosts" />
      <!-- <div class="pages">
        <div
          class="page"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ page__content: page === pageNumber }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div> -->
    </div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.pages {
  display: flex;
  cursor: pointer;
  margin-top: 15px;
  justify-content: center;
}
.page {
  border: 1px solid teal;
  padding: 10px;
}

.page__content {
  border: 3px solid blue;
}

select {
  color: teal;
  border: 3px solid teal;
  padding: 9px;
}
.head {
  display: flex;
  gap: 10px;
}

.observer {
  height: 30px;
  background-color: green;
}
</style>
