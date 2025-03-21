import { createApp } from "vue";
// import './style.css'
// import App from "./App.vue";
import App from "./AppCAPI.vue";
import components from "./components/UI/index";
import directives from "./directives/index";
const app = createApp(App);

directives.forEach((directive) => app.directive(directive.name, directive));
// components.forEach((component) => app.component(component.name, component));

app.mount("#app");

// createApp(App).mount("#app");
