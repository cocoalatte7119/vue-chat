// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//Router
import router from '@/router'

//firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA2isL2ym1bEhM9PI7RExBZc1vVnyK7UHo",
  authDomain: "vue-chat-5b636.firebaseapp.com",
  projectId: "vue-chat-5b636",
  storageBucket: "vue-chat-5b636.appspot.com",
  messagingSenderId: "164686479315",
  appId: "1:164686479315:web:6b5a05900e7315a13cb926"
};

initializeApp(firebaseConfig);

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.mount('#app')
