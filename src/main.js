import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/index.js";

import { createImageKitVue } from "imagekit-vue3"


loadFonts();

const app = createApp(App);


app.use(vuetify)
  .use(router)
  // .use(createImageKitVue, {
  //   urlEndpoint: "https://ik.imagekit.io/quentinglx", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  //   publicKey: "public_QoAnOszxzry0gVchb2sz3NhXi+w=", // optional
  //   registerGlobalComponents: true, // optional. Default is false, this will register all ImageKitVue components globally
  // });

app.mount("#app");
