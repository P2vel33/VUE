import { createApp } from "vue";
// import './style.css'
// import App from "./App.vue";
import App from "./AppCAPI.vue";
import components from "./components/UI/index";
const app = createApp(App);

components.forEach((component) => app.component(component.__name, component));

app.mount("#app");

// createApp(App).mount("#app");
