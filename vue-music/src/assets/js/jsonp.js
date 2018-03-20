import Jsonp from 'jsonp'

export default function jsonp(url, data, option) {
    url += (url.indexOf("?") ? '?' : '&') + param(data)
   
    return new Promise((reslove, reject) => { 
        console.log(url)
        Jsonp(url, option, (err, data) => {
            if (!err) {
                reslove(data)
            } else {
                reject(err)
            }
        })
    })
}

export function param(data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''      
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    //substring(1) 返回&后面的内容

    return url ? url.substring(1) : ''
}