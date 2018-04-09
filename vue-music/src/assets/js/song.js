
//集中处理维护 类的扩展性比对象强
export default class Song{
    //对象{id songmid 作者 歌曲名 歌曲介绍 长度 歌曲图片 歌曲路径}
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

//截取歌曲需要的信息
export function createSong(musicData,musicVkey){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,       
        album:musicData.albumname,       
        duration:musicData.interval,       
        image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000l`,       
        url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${musicVkey}&guid=9930773040&uin=0&fromtag=66`
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
    return ret.join('/')
}

