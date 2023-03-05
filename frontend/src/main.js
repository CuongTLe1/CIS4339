import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

//state managment library
import { createPinia } from 'pinia'

const app = createApp(App)

//create a pinia root store
const pinia = createPinia();
//pinia should be able to use router - has to be setup as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

//add pinia object to instance
app.use(pinia)
app.use(router)
app.mount('#app')
