<template>
  <div class="recommend">
      <banner :banner="banner">
        
      </banner>
  </div>
</template>

<script>
import Banner from "@/base/banner"
import { getrecommend } from "@/api/recommend.js"
import { ERR_OK } from "@/api/config.js"

export default {
  data() {
    return {
      banner: []
    }
  },
  components: {
    Banner
  },
  created() {
    this._getrecommend();
  },
  methods: {
    _getrecommend() {
      getrecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banner = res.data.slider;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
