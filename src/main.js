import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/index.js";
import PrimeVue from 'primevue/config';

// import Card from 'primevue/card';
// import Button from 'primevue/button';

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                //core css

loadFonts();

const app = createApp(App);

app.use(PrimeVue).use(vuetify).use(router);

// app.component('Button', Button)
// app.component('Card', Card)

app.mount("#app");
