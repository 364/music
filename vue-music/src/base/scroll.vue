<template>
  <div class="warpper" ref="warpper">
      <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.warpper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.warpper, {
        probeType: this.probeType,
        click: this.click
      });
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      //重新更新
      this.scroll && this.scroll.refresh();
    }
    // },//无法监听数据刷新滚动，会报错，崩溃
    // watch: {
    //   data() {
    //     setTimeout(() => {
    //       this.refresh()
    //     }, this.refreshDelay);
    //   }
    // }
  }
};
</script>

<style scoped>
.warpper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>


