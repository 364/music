<template>
    <transition name="slide">
        <song-list :songs="songs" :title="title" :bgImage="bgImage"></song-list>
    </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail, getSongUrl } from "@/api/singer.js";
import { ERR_OK } from "@/api/config.js";
import { createSong } from "@/assets/js/song.js";
import SongList from "../music-list/music-list";

export default {
  components: {
    SongList
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage(){
      return this.singer.avatar
      console.log(this.singer)
    },
    ...mapGetters(["singer"])
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getDetail();
    // console.log(this.singer);
  },
  methods: {
    _getDetail() {
      //刷新页面没数据调回歌手页
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list);
          this.songs = this._normalizeSongs(res.data.list);
          console.log(this.songs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      // console.log(list);
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          // console.log(musicData.songmid);
          getSongUrl(musicData.songmid).then(res => {
            if (res.code === ERR_OK) {
              let songKey = res.data.items[0].vkey;
              let newSong = createSong(musicData, songKey);
              console.log(newSong)
              ret.push(newSong);
            }
          })
        }
      });
      return ret;
    }
  }
};
</script>
<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>

