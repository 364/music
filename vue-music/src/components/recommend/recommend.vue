<template>
  <div class="recommend">
      <banner :banner="banner"></banner>
      <div class="recommList">
        <p class="listTitle">{{ SongListTitle }}</p> 
        <div class="songList">
          <ul>
            <li v-for="(item,index) in list">
              <img :src="list[index].imgurl" />
              <div class="listDisc">{{ list[index].dissname }}</div>
              <div class="listAutor">
                <span >{{ list[index].creator.name }}</span>
                <!-- <span class="textRight">收听数：{{ listenNum(list[index].listennum) }}</span>            -->
                <!-- <i class="icon-play-mini"></i> -->
              </div>
              
            </li>
          </ul>
          
        </div> 
      </div>
  </div>
</template>

<script>
import Banner from "@/base/banner";
import { getRecommend, getPalyList } from "@/api/recommend.js";
import { ERR_OK } from "@/api/config.js";

export default {
  components: {
    Banner
  },
  data() {
    return {
      banner: [],
      list: [],
      SongListTitle: "推荐歌单"
    };
  },
  created() {
    this._getRecommend(), this._getPalyList();
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

<style lang="stylus" scoped>
.listTitle {
  color: #ffcd32;
  font-weight: bold;
  text-align: center;
  margin: 10px;
}

.songList {
  ul {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    line-height  :22px

    li {
      display: inline-block;
      padding-left: 2%;
      width: 47%;

      img {
        width: 100%;
      }

      .listDisc {
        width :100%
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .listAutor {
        font-size: 12px;
      }
      .textRight{
        float :right
      }
    }
  }
}
</style>
