import { createApp } from "vue";
// import './style.css'
// import App from "./App.vue";
import App from "./AppCAPI.vue";
import components from "./components/UI/index";
import directives from "./directives/index";
import router from "./router/router";
const app = createApp(App);

directives.forEach((directive) => {
  // console.log(directive.name);
  app.directive(directive.name, directive);
});
components.forEach((component) => {
  //   console.log(component.__name);
  return app.component(component.__name, component);
});

app.use(router).mount("#app");

// createApp(App).mount("#app");
