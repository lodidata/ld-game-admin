'use strict'

const path = require('path')
const allConfig = require('../client/config.json')
const argList = require('../build/getArgList')()

const client = argList.client || 'dev'
const cdn = argList.cdn || ''
const pre = argList.pre || ''

const assetsPublicPath = cdn + (pre ? '/' + pre + '/' : '/')

client && console.log(`当前运行客户:${allConfig[client].name}`)
cdn && console.log(`cdn:${cdn}`)
pre && console.log(`pre:${pre}`)

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    // host: '192.168.5.170',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../public/index.html'),
    assetsRoot: path.resolve(__dirname, '../public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: assetsPublicPath,
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
