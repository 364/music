<template>
    <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
      <ul>
          <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
              <h2 class="list-group-title">{{group.title}}</h2>
              <ul>
                  <li @click='selectItem(item)' v-for="(item,index) in group.items" class="list-group-item" :key="index">
                      <img class="avatar" v-lazy="item.avatar" />
                      <span class="name">{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="list-cutList" @touchstart="onCutTouch" @touchmove.stop.prevent="onCutTouchMove">
        <ul>
          <li v-for="(item,index) in cutList" class="item" :key="index" :index="index" :class="{'current':currentIndex===index}">{{item}}</li>
        </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle">
        <h1 class="fixed-title list-group-title">{{fixedTitle}}</h1>
      </div>
  </scroll>
</template>
<script>
import Scroll from "@/base/scroll";

const ANCHOR_HEIGHT = 18;

export default {
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3; //不节流 监听
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    };
  },
  components: {
    Scroll
  },
  computed: {
    cutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  methods: {
    selectItem(item) {
      this.$emit("select", item);
    },
    onCutTouch(e) {
      let oIndex = e.target.getAttribute("index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.oIndex = oIndex;
      this._scrollTo(oIndex);
    },
    onCutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let oFfset = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let oIndex = parseInt(this.touch.oIndex) + oFfset;
      this._scrollTo(oIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _scrollTo(index) {
      //点击字体以外的
      if (index === null) {
        return;
      }
      //点击热上面的方块部分
      if (index < 0) {
        index = 0;
      }
      //点击Z下面的方块部分
      // else if (index > this.listHeight.length - 2) {
      //   index = this.listHeight.length - 2;
      // }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0); //第二个参数是滑动的时间
    },
    calcuateHeight() {
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    data: function() {
      setTimeout(() => {
        this.calcuateHeight();
      }, 20);
    },
    //val值是负值
    scrollY: function(val) {
      const listHeight = this.listHeight;
      //当滚动到顶部,val>0
      if (val > 0) {
        this.currentIndex = 0;
        return;
      }
      //当滚动到中间
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-val >= height1 && -val < height2) {
          this.currentIndex = i;
          return;
        }
      }
      //当滚动到底部 -val>最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/variable";

.listview {
  position: fixed;
  top: 88px;
  bottom: 0;
  max-width: 640px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-text;
  ul {
    li:last-child {
      ul:last-child {
        margin-bottom: 80px;
      }
    }
  }
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-dialog-background;
      background: @color-bg-highlight;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-highlight-background;
        font-size: @font-size-medium;
      }
    }
  }
}
.list-cutList {
  position: absolute;
  z-index: 30;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: @color-bg-highlight;
  font-family: Helvetica;
  .item {
    padding: 3px;
    line-height: 1;
    color: #999;
    font-size: @font-size-small;
    &.current {
      color: @color-theme;
    }
  }
}
.list-fixed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: @font-size-small;
  color: @color-dialog-background;
  background: @color-bg-highlight;
}
</style>



