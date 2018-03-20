<template>
  <div class="singer">
      <list-view :data="singers"></list-view>
  </div>
</template>

<script>
import ListView from "@/base/listview";
import { getSingerList } from "@/api/singer.js";
import { ERR_OK } from "@/api/config.js";
import Singer from "../../assets/js/singer.js";


export default {
  components:{
    ListView
  },
  data() {
    return {
      singers: [],
      HOT_NAME: "热门",
      HOT_SINGER_LEN: 10
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers)
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: this.HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        //热门分类10
        if (index < this.HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        //字母开头分类
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      console.log(map)
      //为了得到有序列表，我们需要处理map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === this.HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);//concat连接
    }
  }
};
</script>

<style lang="less" scoped>

</style>
