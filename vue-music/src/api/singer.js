import jsonp from '@/assets/js/jsonp'
import axios from 'axios'
import { recommendParam, options } from './config.js'

export function getSingerList() {
    const url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg"
    //深层复制Object.assign({},复制内容)
    const data = Object.assign({}, recommendParam, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 1928093487
    })

    return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, recommendParam, {
        hostUin: 0,
        begin: 0,
        needNewCode: 0,
        songstatus: 1,
        singermid: singerId,
        num: 80,
        platform: 'yqq',
        g_tk: 1664029744
    })

    return jsonp(url, data, options)
}

export function getSongUrl(mid) {
    const url = '/api/getSongUrl'
    console.log(mid)
    const data = Object.assign({}, recommendParam, {
        // jsonpCallback:'MusicJsonCallback08081130369647016',
        loginUin: 0,
        hostUin: 0,
        platfrom: 'yqq',
        needNewCode: 0,
        songmid: mid,
        cid: 205361747,
        filename: 'C400' + mid + '.m4a',     
        uin: 0,      
        format: 'json',
        guid: 9930773040, 
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        // console.log(res.data)
        return res.data
    }).catch((e) => {
        console.log(e)
    })
}
