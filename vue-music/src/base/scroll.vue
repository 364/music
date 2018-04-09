<template>
  <div class="warpper" ref="warpper" >
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
    },
    //监听并给高亮
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  created() {
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
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", (pos) => {
          //pos是对象有x和y轴
          me.$emit('scroll', pos)

        });
      }
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
    },
    //歌手排行滑动
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    //歌手排行滑动
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  }, //终于没报错 要用data:function(){}写法 不要放在methods里
  watch: {
    data: function() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style scoped>
.warpper {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>


