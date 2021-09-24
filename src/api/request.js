import axios from "axios"
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(obj){
  const instance = axios.create({
    baseURL: 'https://ku.qingnian8.com/dataApi/vueadmin',
    timeout: 5000,
    headers:{"X-token":window.sessionStorage.getItem("token")}
  });
  instance.interceptors.request.use(config=>{
    Nprogress.start()
    return config
  });
  instance.interceptors.response.use(function(response){
    Nprogress.done()
    return response
  });

   return instance(obj)
}
export function request2(config){
  const instance = axios.create({
    baseURL: 'https://ku.qingnian8.com/dataApi/vueadmin',
    timeout: 5000,
  });
  return instance(config)
}

