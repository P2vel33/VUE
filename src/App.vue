<script>
export default {
  data() {
    return {
      likes: 0,
      posts: [
        { id: 1, title: "JavaScript 1", body: "Learn JS 1" },
        { id: 2, title: "JavaScript 2", body: "Learn JS 2" },
        { id: 3, title: "JavaScript 3", body: "Learn JS 3" },
        { id: 4, title: "JavaScript 4", body: "Learn JS 4" },
      ],
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    createPost(post) {
      const newPost = {
        id: Date.now(),
        title: post.title,
        body: post.body,
      };
      this.posts.push(newPost);
      post.title = "";
      post.body = "";
    },
  },
};
</script>

<template>
  <div class="app">
    <!-- <h1>{{ likes }}</h1> -->
    <!-- <button v-on:click="addLike">Like</button> -->
    <div class="new_post">
      <input v-model="post.title" type="text" placeholder="Name" />
      <input
        v-bind:value="post.body"
        v-on:input="(event) => (this.post.body = event.target.value)"
        type="text"
        placeholder="Description"
      />
      <button
        @click="createPost(this.post)"
        class="btn"
        style="margin-left: auto"
      >
        Create Post
      </button>
    </div>

    <h1>Post`s list</h1>
    <div class="post">
      <div class="post__content" v-for="post in posts" :key="post.id">
        <div>
          <strong>Id: </strong>{{ post.id }} <strong>Title:</strong>
          {{ post.title }}
        </div>
        <div><strong>Description:</strong> {{ post.body }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
}

.post {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post__content {
  padding: 10px;
  border: 3px solid teal;
}

.btn {
  cursor: pointer;
  background: none;
  border: 3px solid teal;
  color: teal;
  padding: 10px;
}

.new_post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

input {
  height: 20px;
}
</style>
