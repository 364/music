import jsonp from '@/assets/js/jsonp'
import { recommendParam, options } from './config'

export function getrecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    
    //深层复制Object.assign({},复制内容)
    const data = Object.assign({}, recommendParam,{
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    
    return jsonp(url, data, options)
}

