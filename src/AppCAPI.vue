<script setup>
import { provide, ref, watch } from "vue";
import PostsList from "./components/PostsList.vue";
import PostForm from "./components/PostForm.vue";
import usePosts from "./hooks/usePosts";

const isVisiable = ref(false);
const selectedSort = ref("");
const sortOptions = [
  { value: "title", name: "Sort of title" },
  { value: "body", name: "Sort of body" },
  { value: "id", name: "Sort of id" },
];
const limit = ref(10);
const page = ref(1);
const { posts, isLoading, totalPages, fetchPosts } = usePosts(limit, page);

const createPost = (post) => {
  posts.value.push({ ...post, id: Date.now() });
};

const deletedPost = (post) => {
  posts.value = [...posts.value].filter((elem) => elem.id !== post.id);
};

const changePage = (pageNumber) => {
  page.value = pageNumber;
};

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

watch(page, () => {
  fetchPosts();
});
watch(selectedSort, () => {
  checkSort(selectedSort.value);
});

provide("deletedPost", deletedPost);
</script>

<template>
  <div class="app">
    <div class="head">
      <my-button @click="() => (isVisiable = true)">Create</my-button>
      <my-select
        :sortOptions="sortOptions"
        :selectedSort="selectedSort"
        @update:selectedSort="(value) => (selectedSort = value)"
      />
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
      <posts-list v-bind:posts="posts" />
      <div class="pages">
        <div
          class="page"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ page__content: page === pageNumber }"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
      </div>
    </div>
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
</style>
