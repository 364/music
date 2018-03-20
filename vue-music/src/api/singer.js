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