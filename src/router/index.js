import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import Welcome from "../views/welcome/Welcome.vue";
import Alluser from "../views/alluser/Alluser.vue";
import Adduser from "../views/adduser/Adduser.vue";
import Datauser from "../views/datauser/Datauser.vue"
import News from "../views/news/index.vue"


Vue.use(VueRouter)

const routes=[
{
  path:"/",
  redirect:"/login"
},
  {
    path:"/login",
    name:"Login",
    component:Login
  },{
    path:"/home",
    component:Home,
    redirect:"/welcome",
    children:[
      {
        path:"/welcome",
        component:Welcome
      },
      {
        path:"/all",
        component:Alluser
      },
      {
        path:"/add",
        component:Adduser
      },
      {
        path:"/data",
        component:Datauser
      },
      {
        path:"/news",
        component:News
      },
    ]
  }
]
const router = new VueRouter({
  routes
})
//导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    return next()
  }
  var token = window.sessionStorage.getItem("token")
  if(!token){
    return next({path:"./login"})
  }
  next()
})
export default router