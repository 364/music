<template>
  <div class="song-list">
      <div class="back" @click="back">
          <i class="iconfont">&#xe697;</i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
          <div class="play-wrapper">
            <div class="play" v-show="songs.length > 0" ref="autoPlay">
              <i class="icon-play"></i>
              <span class="text">随机播放</span>
            </div>
          </div>
          <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll @scroll="scroll"  class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" >
          <div class="song-list-wrapper">
              <song @select="selectItem" :songs="songs" :imgHeight="imgHeight"></song>
          </div>
          <div v-show="!songs.length">
              <loading></loading>
          </div>
      </scroll>
     
  </div>
</template>
<script>
import Scroll from "@/base/scroll";
import Song from "@/base/songs-list";
import Loading from "@/base/loading";
import { mapActions } from "vuex";
import { prefixStyle } from "../../assets/js/dom.js";

const RESERVED_HEIGHT = 45;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");

export default {
  components: {
    Scroll,
    Song,
    Loading
  },
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  data() {
    return {
      imgHeight: 0,
      imgWidth: 0,
      scrollY: 0,
      minTranslateY: 0
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  mounted() {
    this.imgHeight = this.$refs.bgImage.clientHeight;
    this.imgWidth = this.$refs.bgImage.clientWidth;
    this.minTranslateY = -this.imgHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imgHeight}px`;
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions(["selectPlay"])
  },
  watch: {
    scrollY(val, oldVal) {
      let zIndex = 0,
        scale = 1, //缩放
        blur = 0; //模糊
      let newVal = Math.max(this.minTranslateY, val);
      this.$refs.layer.style[transform] = `translateY(${newVal}px)`;
      const percent = Math.abs(val / this.imgHeight);
      if (val > 0) {
        if (this.imgWidth < 640) {
          scale = 1 + percent;
          zIndex = 10;
        }
      } else {
        blur = Math.min(20 * percent, 20);
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      if (val < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.autoPlay.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "70%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.autoPlay.style.display = "block";
      }
      this.$refs.bgImage.style.zIndex = zIndex;
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/variable";
@import "../../assets/less/mixin";

.song-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: @color-text;
  max-width: 640px;
  margin: 0 auto;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 10px;
      font-size: @font-size-large-x;
      color: @color-text;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    .no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: @font-size-large;
    color: @color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      border: 1px solid;
      padding: 0.45rem 1.5rem;
      border-radius: 25px;
      font-size: 0.9rem;
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    .song-list-wrapper {
      padding: 0 18px 20px;
    }
    // .loading-container {
    //   position: absolute;
    //   width: 100%;
    //   top: 50%;
    //   transform: translateY(-50%);
    // }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: @color-text;
  }
}
</style>
