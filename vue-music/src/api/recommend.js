import jsonp from '@/assets/js/jsonp'
import axios from 'axios'
import { recommendParam, options } from './config'

//获取banner
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    //深层复制Object.assign({},复制内容)
    const data = Object.assign({}, recommendParam, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

//获取推荐歌单
export function getPalyList() {
    const url = '/api/getSongList'

    const data = Object.assign({}, recommendParam, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url, {
        params: data
      }).then((res) => {
        return res.data
      }).catch((e) => {
        console.log(e)
      })
}