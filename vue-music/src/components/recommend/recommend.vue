<template>
  <div class="recommend">
    <scroll :data="list">
      <div>
        <banner :banner="banner"></banner>
        <div class="recommList">
          <p class="listTitle">{{ SongListTitle }}</p> 
          <div class="songList">
            <ul>
              <li v-for="(item,index) in list" :key="index">
                <img v-lazy="list[index].imgurl" />
                <div class="listDisc">{{ list[index].dissname }}</div>
                <div class="listAutor">
                  <span >{{ list[index].creator.name }}</span>
                  <span class="textRight"><i class="iconfont">&#xe60a;</i> {{ listenNum(list[index].listennum) }}</span>   
                  <div class="clear"></div>        
                  <!-- <i class="icon-play-mini"></i> -->
                </div> 
              </li>
            </ul> 
          </div>
        </div> 
      </div>
      <div class="loadingMain" v-show="!list.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/base/scroll";
import Banner from "@/base/banner";
import Loading from "@/base/loading";
import { getRecommend, getPalyList } from "@/api/recommend.js";
import { ERR_OK } from "@/api/config.js";

export default {
  components: {
    Banner,
    Scroll,
    Loading
  },
  data() {
    return {
      banner: [],
      list: [],
      SongListTitle: "推荐歌单"
    };
  },
  created() {
    this._getPalyList(),
    this._getRecommend() ;
  },
  computed: {},
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banner = res.data.slider;
        }
      });
    },
    _getPalyList() {
      getPalyList().then(res => {
        if (res.code === ERR_OK) {
          this.list = res.data.list;
          console.log(this.list);
        }
      });
    },
    listenNum(num) {
      if (num.length < 5) {
        return num;
      } else {
        let n = (num / 10000).toFixed(2);
        return n + "万";
      }
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
@import "../../assets/less/variable";
@import "../../assets/less/reset";

.recommend{
  position:fixed;
  width:100%;
  top:88px;
  bottom:0;
  background: white;
  max-width: 760px;
}
.listTitle {
  color: #ffcd32;
  font-weight: bold;
  text-align: center;
  margin: 10px;
}

.loadingMain{
  position:absolute;
  width: 100%;
  top:50%;
  transform: translateY(-50%)
}

.songList {
  ul {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    line-height: 22px;

    li {
      display: inline-block;
      padding-left: 2%;
      width: 47%;

      img {
        width: 100%;
        cursor: pointer;
      }

      .listDisc {
        width: 100%;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 3px 0;
      }

      .listAutor {
        font-size: 12px;
        margin-bottom: 5px;
        span {
          width: 60%;
          float: left;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .textRight {
        width: 40% !important;
        text-align: right;
        color: #999;
      }
    }
  }
}
</style>
