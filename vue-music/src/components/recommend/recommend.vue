<template>
  <div class="recommend">
      <banner :banner="banner">
        
      </banner>
  </div>
</template>

<script>
import Banner from "@/base/banner"
import { getRecommend,getPalyList } from "@/api/recommend.js"
import { ERR_OK } from "@/api/config.js"

export default {
  components:{
    Banner
  },
  data() {
    return {
      banner: []
    }
  },
  created() {
    this._getRecommend(),
    this._getPalyList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banner = res.data.slider;
        }
      })
    },
    _getPalyList() {
      getPalyList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data)
        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
