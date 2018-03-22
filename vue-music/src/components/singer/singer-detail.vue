<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSingerDetail, getSongUrl } from "@/api/singer.js";
import { ERR_OK } from "@/api/config.js";

export default {
  computed: {
    ...mapGetters(["singer"])
  },
  data() {
    return {};
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
        }
      });
      getSongUrl("001OyHbk2MSIi4").then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          console.log(
            "http://dl.stream.qqmusic.qq.com/C400" +
              "001OyHbk2MSIi4" +
              ".m4a?vkey=" +
              res.data.items[0].vkey +
              "&guid=9930773040&uin=0&fromtag=66"
          );
        }
      });
    },
    _nomalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let { musicDta } = item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>

