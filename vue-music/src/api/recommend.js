import jsonp from '@/assets/js/jsonp'
import axios from 'axios'
import { recommendParam, options } from './config'

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
        // headers: {
        //   referer: 'https://c.y.qq.com/',
        //   host: 'c.y.qq.com'
        // },
        params: data
      }).then((res) => {
        //return Promise.resolve(res.data).json(response.data)
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
}