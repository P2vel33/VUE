<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import PostsList from "../components/PostsList.vue";
import PostForm from "../components/PostForm.vue";
import usePosts from "../hooks/usePosts";
import { usePostsStore } from "../store/PostsStore";

const postsStore = usePostsStore();

provide("deletedPost", postsStore.deletedPost);
</script>

<template>
  <div>
    <div class="head">
      <my-button @click="() => (postsStore.isVisiable = true)"
        >Create</my-button
      >
      <my-select
        :sortOptions="postsStore.sortOptions"
        :selectedSort="postsStore.selectedSort"
        @update:selectedSort="(value) => (postsStore.selectedSort = value)"
      />
      <my-input
        v-focus
        placeholder="Search..."
        v-model="postsStore.search"
      ></my-input>
    </div>

    <my-modal
      :isVisiable="postsStore.isVisiable"
      @update:isVisiable="
        (newVisiable) => (postsStore.isVisiable = newVisiable)
      "
    >
      <post-form
        @create="postsStore.createPost"
        :isVisiable="postsStore.isVisiable"
        @update:show="(newVisiable) => (postsStore.isVisiable = newVisiable)"
      />
    </my-modal>

    <my-loading v-if="postsStore.isLoading" />
    <div v-else>
      <posts-list v-bind:posts="postsStore.searchAndSortedPosts" />
    </div>
    <div v-intersection="postsStore.loadMorePosts" class="observer"></div>
  </div>
</template>

<style scoped>
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

.head {
  display: flex;
  gap: 10px;
}

.observer {
  height: 30px;
  background-color: green;
}
</style>
