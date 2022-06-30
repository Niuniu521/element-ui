import {request,request2} from "./request"
export function loginAxios(config){
  return request2({
    url:"/login.php",
    params:config
  })
}
export function tqData(){
  return request({
    url:"/tianqi3day.php",
    
  })
}
export function userAllFun(config){
  return request({
    url:"/yxList.php",
    params:config
  })
}
export function delUser(id){
  return request({
    url:"/yxDelRow.php",
    params:{
      id:id
    }
  })
}

export function getKefuInfo(){
  return request({
    url:"/yxLoad.php",
  })
}

export function addUser(myObj){
  return request({
    url:"/yxAdd.php",
    params:myObj
  })
}
//验证数据库中是否已经存在该用户，其中主要验证，电话、微信、QQ。
export function ValidataFun(myObj){
  return request({
    url:"/yxValidate.php",
    params:myObj
  })
}
//根据id获取用户记录
export function getUser(id){
  return request({
    url:"/yxRow.php",
    params:{
      id
    }
  })
}
//修改用户记录
export function upDAta(obj){
  return request({
    url:"yxUpdata.php",
    params:obj
  })
}

//获取一周的排名
export function paiMing(val){
  return request({
    url:"/dataPaiming.php",
    params:{
      pullTime:val
    }
  })
}
//获取专业分布
export function zydata(val){
  return request({
    url:"/dataFenBu.php",
    params:{
      pullTime:val
    }
  })
}
// 获取客服数据
export function kfdata(val){
  return request({
    url:"/dataKefu.php",
    params:{
      pullTime:val
    }
  })
}

//获取用户总量
export function zongdata(){
  return request({
    url:"/dataZong.php"
  })
}





// 查询列表
export function listData(config) {
  return request({
    url:"/yxList.php",
    params:config
  }).then(res => {
    console.log(res);
    let data = {
      records: [],
      total: 0
    };
    if (res.status === 200) {
      data = res.data;
    }
    console.log(data);
    return data;

  })
}