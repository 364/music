// 异步操作或对mutations的封装
import * as types from './mutations-type'

//对象{}{列表，索引}
export const selectPlay = function({commit,state},{list,index}){
    //提交
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}