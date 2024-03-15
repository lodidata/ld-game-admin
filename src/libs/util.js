import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf } from '@/libs/tools'

export const TOKEN_KEY = 'token'

export const setToken = token => {
  // Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
  sessionStorage.setItem('token', token)
}

export const getToken = () => {
  // const token = Cookies.get(TOKEN_KEY)
  const token = sessionStorage.getItem('token')
  if (token) return token
  else return false
}

export const hasChild = item => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

const showMenu = (item, access) => {
  return typeof item.meta.id !== 'undefined' && access.includes(item.meta.id)
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  const res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu && showMenu(item, access))) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access)
      ) {
        obj.menuLen = item.children.length
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  const homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
  const routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  const res = routeMetched
    .filter(item => {
      return item.meta === undefined || !item.meta.hide
    })
    .map(item => {
      const meta = { ...item.meta }
      if (meta.title && typeof meta.title === 'function') meta.title = meta.title(route)
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: meta
      }
      return obj
    })
  // 即使隐藏三级菜单，也需要显示面包屑导航
  // res = res.filter(item => {
  //   return !item.meta.hideInMenu
  // })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}

export const getRouteTitleHandled = route => {
  const router = { ...route }
  const meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') title = meta.title(router)
    else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => {
  const title = (item.meta && item.meta.title) || item.name
  return title
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  const len = routers.length
  let homeRoute = {}
  while (++i < len) {
    const item = routers[i]
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  const newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.id) return access.includes(route.meta.id)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = list => {
    return list.some(item => {
      // 是否为当前路由
      if (item.name === name) {
        return hasAccess(access, item)
      } else if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      }
    })
  }
  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  const paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = file => {
  const nameSplit = file.name.split('.')
  const format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function(evt) {
      const data = evt.target.result // 读到的数据
      const pasteData = data.trim()
      arr = pasteData
        .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
        .map(row => {
          return row.split('\t')
        })
        .map(item => {
          return item[0].split(',')
        })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = array => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    const titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      const res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  const parentNode = ele.parentNode
  if (parentNode) {
    const classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    const len = ele.childNodes.length
    while (++i < len) {
      const child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  // 只比较路由名，不比较参数
  return route1.name === route2.name
  // const params1 = route1.params || {}
  // const params2 = route2.params || {}
  // const query1 = route1.query || {}
  // const query2 = route2.query || {}
  // return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

export const localRead = key => {
  return localStorage.getItem(key) || ''
}

/**
 * 是否重复操作
 * @export
 * @param {string} [name='default'] 操作标识符
 * @param {number} [time=300] 间隔时间
 * @returns
 */
const reData = {}
export const isRepeat = (name = 'default', time = 300) => {
  const i = new Date()
  const re = i - (isNaN(reData[name]) ? 0 : reData[name])
  reData[name] = i
  return re <= time
}

/**
 * 表单生成器
 * @param {*} obj 待转换的数据对象
 */
export const formBuilder = obj => {
  const formData = new FormData()
  Object.keys(obj).forEach(k => {
    formData.append(k, obj[k])
  })
  return formData
}



export const addSearch = obj => {
  if (obj) {
    let str = '?';
    for (let i in obj) {
      if (obj[i] === 0 || obj[i] === '0' || obj[i] || obj[i] === false || obj[i] === 0) {
        if (typeof obj[i] == 'boolean') {
          str += i + '=' + obj[i].toString() + '&';
        } else {
          str += i + '=' + obj[i] + '&';
        }
      }
    }
    return str.substring(0, str.length - 1);
  } else {
    return '';
  }
}
