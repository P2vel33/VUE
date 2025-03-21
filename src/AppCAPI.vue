<script setup>
import { onMounted, provide, ref, watch } from "vue";
import MyButton from "./components/UI/MyButton.vue";
import PostsList from "./components/PostsList.vue";
import PostForm from "./components/PostForm.vue";
import MyModal from "./components/UI/MyModal.vue";
import MyLoading from "./components/UI/MyLoading.vue";
// import usePosts from "./hooks/usePosts";

const posts = ref([]);
const isVisiable = ref(false);
const isLoading = ref(false);
const limit = ref(10);
const page = ref(2);
const totalPages = ref(0);

function createPost(post) {
  posts.value.push({ ...post, id: Date.now() });
}

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const params = new URLSearchParams({
      _limit: limit.value,
      _page: page.value,
    }).toString();
    console.log(params);
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

const deletedPost = (post) => {
  posts.value = [...posts.value].filter((elem) => elem.id !== post.id);
};

const changePage = (pageNumber) => {
  page.value = pageNumber;
};

watch(page, () => {
  fetchPosts();
});

provide("deletedPost", deletedPost);
onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="app">
    <my-button @click="() => (isVisiable = true)">Create</my-button>
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

    <!-- @update:posts="deletePost" -->
    <!-- <div class="page__wrapper">
      <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ current__page: page === pageNumber }"
        :style="{}"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
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
  /* position: absolute; */
  margin-top: 15px;
  justify-content: center;

  /* align-items: stretch; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* gap: 5px; */
}
.page {
  border: 1px solid teal;
  padding: 10px;
}

.page__content {
  border: 3px solid blue;
}

/* .page__wrapper {
  display: flex;
  margin-top: 15px;
  cursor: pointer;
}

.page {
  border: 1px solid blue;
  padding: 10px;
}

.current__page {
  border: 2px solid teal;
} */
</style>
