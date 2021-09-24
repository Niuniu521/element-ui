export function myDate(time){
  var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + " ";
  var H = date.getHours() + ":";
  var MIN = date.getMinutes();
  //var S = date.getSeconds();
  return Y+M+D+H+MIN;
    }
