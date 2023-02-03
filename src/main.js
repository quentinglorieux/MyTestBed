import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'






// PrimeVue
// import Card from 'primevue/card';
// import Button from 'primevue/button';



import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                //core css

import 'vue3-easy-data-table/dist/style.css';

loadFonts();

const app = createApp(App);

app.use(router)
    .use(vuetify)
    .use(OpenLayersMap)
    // .use(PrimeVue)

    app.component('EasyDataTable', Vue3EasyDataTable);

// PrimeVue
// app.component('Button', Button)
// app.component('Card', Card)

app.mount("#app");
