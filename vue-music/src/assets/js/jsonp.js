import Jsonp from 'jsonp'

export default function jsonp(url,date,option){
    return new Promise((reslove,reject)=>{
        Jsonp(url,option,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

export function param(data){
    let url=''
    for(var k in data){
        let value=data[k]!==undefined?data[k]:''
        url= '&'+k+'='+encodeURIComponent(value)
    }
    return url?url.substring(1):''
}