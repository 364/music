
//集中处理维护 类的扩展性比对象强
export default class Song{
    //对象{id mid 作者 歌曲 长度 图片 真实路径}
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id=id
        this.mid=mid
        this.singer=singer
        this.name=name
        this.album=album
        this.duration=duration
        this.image=image
        this.url=url
    }
}

export function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,       
        album:musicData.albumname,       
        duration:musicData.interval,       
        image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicDta.albummid}.jpg?max_age=2592000l`,       
        // url:`https://thirdparty.gtimg.com/${musicData.songid}.m4a?fromtag=38`
    })
}

function filterSinger(singer){
    let ret=[]
    if(!singer){
        return ''
    }
    singer.forEach((s)=>{
        ret.push(s.name)
    })
    return ret.join
}

