import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/style.css';
import App from '@/App.vue';
import router from '@/router';
import { createVuetify } from 'vuetify';
import { useUserStore } from '@/pinia/pinia';

import 'vuetify/styles'; // основные стили
import '@mdi/font/css/materialdesignicons.css'; // иконки MDI
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { initDefaultUsers } from './services/utils';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(vuetify);
app.use(pinia);
app.use(router);

const userStore = useUserStore();
initDefaultUsers();
userStore.initFromLocalStorage();

app.mount('#app');
