// 状态管理
import{playMode} from '@/assets/js/config.js'

const state = {
    singer:{},
    playing:false,//播放暂停
    fullScreen:false,//全屏
    playlist:[],//播放列表
    sequenceList:[],//播放列表(这里存放播放顺序的列表)
    mode:playMode.sequence,//播放模式
    currentIndex:-1,//当前播放索引
}

export default state