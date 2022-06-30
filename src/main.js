import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/assets/styles/index.scss' // global css
import App from './App.vue'
import router from "./router/index"
import Pagination from "@/components/Pagination";
import {resetForm,setData} from "@/utils/ruoyi"


Vue.prototype.setData = setData
Vue.prototype.resetForm = resetForm;
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('Pagination', Pagination)
var vue =new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vue
