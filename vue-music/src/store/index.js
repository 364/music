// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// import mutations-type from './mutations-type'
//给控制台输出日志(修改的log)
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

//开发环境下使用
const debug = process.env.NODE_ENV !=='production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : [] 
})