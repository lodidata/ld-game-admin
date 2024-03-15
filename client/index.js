const fs = require('fs')
const fsExt = require('fs-extra')
const path = require('path')
const rm = require('rimraf')

// 当前客户
const allConfig = require('./config.json')
const argList = require('../build/getArgList')()

// 客户配置
const client = argList.client || 'TG'
// const reqUrl = argList.reqUrl || 'api-admin.caacaya.com' // 测试环境
// const reqUrl = argList.reqUrl || 'lodi-api-admin.caacaya.com' // 测试环境
// const reqUrl = argList.reqUrl || 'dev3-api-admin.caacaya.com'
// const reqUrl = argList.reqUrl || 'lodipre-api-admin.caacaya.com'
// const reqUrl = argList.reqUrl || 'lodi-api-admin.caacaya.com/'
// const reqUrl = argList.reqUrl || 'subapi-admin.tgcp.com/'
const reqUrl = argList.reqUrl || 'ld-test-api.caacaya.com'

const node_id = argList.node_id || 500
const im_url = argList.im_url || 'kf.gztonban.com'
// const language = argList.lang
const config = allConfig[client]

new Date().toISOString()

module.exports = {
  setStart: function() {
    this.setSetting()
    this.setIcon()
  },
  setSetting: function() {
    console.log('client==>', client)
    console.log('config==>', config)
    const nameSet = `name:"${config.name}",`
    const baseUrl = `reqUrl:"${reqUrl}",`
    const nodeId = `nodeId:"${node_id}",`
    const imUrl = `im_url:"${im_url}"`
    // const lang = `language:"${language}"` ${lang}
    const setting = `var setting={${nameSet}${baseUrl}${nodeId}${imUrl}}`
    console.log('setting==>', setting, '---')
    fs.writeFileSync(path.resolve(__dirname, '../static/setting.js'), setting)
  },
  setIcon: function() {
    console.log(`* 开始配置icon`)
    rm.sync(path.resolve(__dirname, '../static/favicon.ico'))
    fsExt.copySync(
      path.resolve(__dirname, '../src/assets/self/' + client + '/img/favicon.ico'),
      path.resolve(__dirname, '../static/favicon.ico')
    ),
    fsExt.copySync(
      path.resolve(__dirname, '../src/assets/self/' + client + '/img/logo.png'),
      path.resolve(__dirname, '../static/logo.png')
    )
  }
}
