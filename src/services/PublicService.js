import moment from 'moment';
import Util from '@/utils/Util.js';


export default class PublicService {
  /**
   * @param {Object} props
   * @description 针对搜索值做统一处理
   */
  static convertParams(props) {
    const newParams = {};
    for (const index in props) {
      const item = props[index];
      const type = typeof item;
      if (item || item === false || item === 0) {
        if (item && type === 'string') {
          newParams[index] = item.trim();
        } else {
          newParams[index] = item;
        }
      }
    }
    return newParams;
  }


  /**
   * @param allProjectInfo 所有项目信息数组
   * @param valueIndex select option的value
   * @param textIndex select option的text
   * @param addAll 添加option {value: '', text: '全部'}
   * @param paramsAll 添加全部元素
   * @returns {Array} 根据需要生成的select option配置
   */
  static transformProjectInfoToSelect(allProjectInfo, valueIndex, textIndex, addAll, paramsAll) {
    let selectOpts = [];
    if (addAll) {
      selectOpts.push({value: '', label: '全部'});
    }
    if (allProjectInfo && allProjectInfo.length !== 0) {
      for (let i = 0, l = allProjectInfo.length; i < l; i++) {
        if (paramsAll) {
          selectOpts.push({
            ...allProjectInfo[i],
            value: allProjectInfo[i][valueIndex],
            label: allProjectInfo[i][textIndex]
          });
        } else {
          selectOpts.push({value: allProjectInfo[i][valueIndex], label: allProjectInfo[i][textIndex]});
        }

      }
    }
    return selectOpts;
  }

  /**
   * 时间格式化
   * @param text 时间戳
   * @param format 转换格式(默认为YYYY-MM-DD)
   */
  static setTime = (text, format = "YYYY-MM-DD") => {
    return moment(text).format(format)
  };


  /**
   * 生成随机id
   * @param len 长度
   * */
  static RandomId(len = 6) {
    return Math.random().toString(36).substr(3, len);
  }

  /**
   * 格式化金钱
   * @param num 值
   * */
  static FormatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * 生成随机颜色
   * @param len 长度
   * */
  static RandomColor(len = 6) {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
  }

  /**
   * 验证数据类型
   * @param tgt 目标
   * @param type 预测类型
   * */
  static DataType(tgt, type){
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
  }

  // 验证手机号码和座机
  static checkTel(value) {
    let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    let isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value) || isPhone.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  // 校验经度是否符合规范
  static checkLong(val) {
    let longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,4})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    if (!longrg.test(val)) {
      return '经度整数为0-180,小数为0到4位!';
    }
    return false
  }

  // 校验纬度是否符合规范
  static checkLat(val) {
    let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,4}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    if (!latreg.test(val)) {
      return '纬度整数为0-90,小数为0到4位!';
    }
    return false;
  }

  /**
   * 实现对象的深克隆
   * obj 为需要克隆对象
   * **/
  static deepClone(obj) {
    if (typeof obj !== "object") {
      return obj;
    }
    if (!obj) {
      return
    }
    let newObj = obj.constructor === Array ? [] : {};  //开辟一块新的内存空间
    for (let i  in  obj) {
      newObj [i] = this.deepClone(obj [i]);                 //通过递归实现深层的复制
    }
    return newObj;
  }


  /**
   * @param data 需要转换结构的源数据
   * @param needColNum 需要增加table序号列数据
   * @param needKey 需要增加唯一标识key
   * @param currentPage 当前页
   * @param pageSize 每页数据数目
   * @returns {*} 转换后的数据
   */
  static transformArrayData(data, needColNum, needKey, currentPage, pageSize) {
    // 需要添加table序号
    if (needColNum) {
      for (let i = 0; i < data.length; i++) {
        // 有分页
        if (currentPage && pageSize) {
          data[i]['num'] = pageSize * (currentPage - 1) + i + 1;
          // 无分页
        } else {
          data[i]['num'] = i + 1;
        }
      }
      // 需要添加唯一标识key
    }
    // 添加Key
    if (needKey) {
      for (let i = 0; i < data.length; i++) {
        // 若数据不存在key字段,则增加唯一标识key
        if (!data[i]['key']) data[i]['key'] = i;
      }
    }
    if (!needColNum && !needColNum) {
      console.info('检查transformArrayData方法参数(needColNum,needKey),返回数据结构未改变');
    }
    return data;
  }

  /**
   * @param array为需要去重的数组 keys为指定的根据字段
   * @returns {Array} 返回筛选后的数组对象
   */
  static uniqeByKeys(array, keys) {
    let result = [], hash = {};
    for (let i = 0; i < array.length; i++) {
      let elem = array[i][keys];
      if (!hash[elem]) {
        result.push(array[i]);
        hash[elem] = true;
      }
    }
    return result
  }

  /**
   * @param data 需要转换结构的源数据
   * @param parentKey 父元素Key值
   * @param newKey 子元素key
   */
  static addKey(data, parentKey, newKey) {
    // 添加Key
    if (newKey) {
      for (let i = 0; i < data.length; i++) {
        // 增加唯一标识key
        data[i]['key'] = parentKey + i + '';
      }
    }
    return data;
  }

  /**
   *  返回指定的字段的一维数组
   *  @param data: 数据源，[{},{}]
   *  @param key: 指定键名
   *  @returns 返回一维数组
   *
   */
  static getDataByKey(data, key) {
    let list = [];
    if (data && data.length) {
      data.map(item => {
        list.push(item[key])
      })
    }
    return list;
  }

  /***
   * @columns 表格的columns属性
   * @returns {number} table宽度
   */
  static getTableWidth(columns) {
    let tableWidth = 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].width) {
        tableWidth = tableWidth + parseInt(columns[i].width)
      } else {
        console.log('PublicService->getTableWidth: columns 中没有配置width属性');
      }
    }
    return tableWidth;
  }

  /***
   * @title 文字
   * @returns {number} 列宽度
   */
  static getColumnWidth(title) {
    /**
     * 默认为80，通过对长度对半并向下取整分组，以20为一阶级
     * 例: 0,1,2,3,4,5,6,7,8,9
     * 除以2向下取整得到 0011223344 的两两组合
     * 以20为一个阶级，加上默认的80
     * */
    return Math.floor(title.length / 2) * 20 + 80;
  }

  /**
   * @param params 导出文件所需参数
   * @returns {*}   返回导出拼接字符串
   */
  static paramSerializer(params) {
    if (!params) return '';
    let urlPart = [];
    for (let k in params) {
      let value = params[k];
      if (value === null || Util.isUndefined(value)) continue;
      if (Util.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i++) {
          urlPart.push(k + '=' + value[i])
        }
      } else {
        urlPart.push(k + '=' + value)
      }
    }
    return urlPart.join('&')
  }

  // 浏览器全屏方法
  static fullScreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  static getCurSysDateFromMillforDay(mill, isChinese) {
    var d = new Date();
    d.setTime(mill);
    if (isChinese) {
      return '第' + d.getDate() + '天';
    }
    return d.getDate();
  }

  // 取消全屏
  static outFull() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else {
      window.parent.showTopBottom();
    }
  }

  /**
   * 保存字段到cookie
   * @param c_name 要保存字段的名称
   * @param value 要保存字段的值
   * @param expireDays 过期时间
   */
  static setCookie(c_name, value, expireDays = 30) {
    document.cookie = c_name + "=" + escape(value);
    // cookie过期时间
    // let expireTimeCode = timeCode + (60 * 60 * 24 * expireDays);
    // if (expireDays)
    //   document.cookie = 'expireTimeCode=' + expireTimeCode
  }

  /**
   * 从cookie中取字段
   * @param c_name 要取得的字段名
   * @returns {string} 返回字段对应的值, 若字段不存在则返回空
   */
  static getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  };

  /**
   * 清空cookie中某字段
   * @param name 要清空的字段名
   */
  static clearCookie(name) {
    this.setCookie(name, "", -1);
  }

  // 年份选择
  static yearSelect() {
    let curYear = new Date().getFullYear();
    let yearSelectOpt = [];
    for (let i = curYear - 100; i < curYear + 100; i++) {
      yearSelectOpt.push({
        text: i,
        value: i,
      });
    }
    return yearSelectOpt;
  }

  /**
   * 将数组按键名取出单一值
   * @param arr [] 目标数组
   * @param key [] 取出数据的属性名
   * @param where ()
   * @returns [] 一维数组
   */
  static arrDataBy(arr, key, where) {
    let data = [];
    for (let i = 0; i < arr.length; i++) {
      let val = arr[i][key];
      if (where) {
        if (typeof where === "function") {
          let B = where(arr[i]);
          if (B) {
            data.push(val)
          }
        } else if (typeof where === "string") {
          if (arr[i][where]) {
            data.push(val)
          }
        }
      } else {
        data.push(val)
      }
    }
    return data
  }

  /**
   * 循环两个数据，根据条件返回新的数组
   * @param arr 目标数组
   * @param arr2 数组2
   * @param keys 条件名称
   * @returns [] 符合条件的数据
   */
  static arrsByKey(arr = [], arr2 = [], keys = []) {
    let list = [];
    arr.map(item => {
      let num = 0; // 记录比对成功次数
      arr2.map(subItem => {
        keys.map(key => {
          item[key] == subItem[key] && num++
        });
      });
      // 比对成功的次数等于比较字段长度，视为比对成功
      num === keys.length && list.push({...item})
    });
    return list
  }

  /**
   * 将数组根据目标键名中取出
   * @param arr 目标数组
   * @param keys 目标键名
   * @param exclude 是否为排除目标键名模式，默认为false
   *  false: 按键名获取字段; true: 获取键名以外的字段
   * @return []
   * */
  static arrToKeyData(arr = [], keys = [], exclude = false) {
    let data = [];
    arr.map((item, index) => {
      data[index] = {};
      let keyNames = Object.keys(item); // 获取arr键名集合
      keys.map(key => {
        keyNames.map(keyName => {
          // 判断是否为排除模式
          if (keyName === key && !exclude) {
            data[index][keyName] = item[key]
          } else if (keyName !== key && exclude) {
            data[index][keyName] = item[key]
          }
        })
      });
    });
    return data
  };

  /***
   * 将对象数组按照对象某一属性分组
   * 每组的数据保存属性data中
   * @param arr 目标数组
   * @param index 分组根据的属性名
   */
  static arrGroupBy(arr, index) {
    let map = {};
    let dest = [];
    for (let i = 0; i < arr.length; i++) {
      let ai = arr[i];
      if (!map[ai[index]]) {
        dest.push({
          [index]: ai[index],
          data: [ai]
        });
        map[ai[index]] = ai;
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j];
          if (dj[index] == ai[index]) {
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    return dest;
  }

  /***
   * 获取url参数
   * @param name 目标参数名称
   */
  static getQueryString(name) {
    let reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)");
    let r = window.location.href.substr(1).match(reg);
    if (r !== null) {
      return unescape(r[2]);
    }
    return null;
  }
}
