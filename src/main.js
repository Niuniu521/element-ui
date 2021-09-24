import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./router/index"

Vue.config.productionTip = false

Vue.use(ElementUI);
var vue =new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vue
