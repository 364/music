<template>
  <div class="song">
      <ul :style="getPadding">
          <li @click="selectItem(song,index)" v-for="(song,index) in songs" :key="index" class="item"  ref="songs">
              <i class="icon-play"></i>
              <div class="content">
                  <h2 class="name">{{song.name}}</h2>
                  <p class="desc">{{getDesc(song)}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    imgHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    selectItem(item, index) {
      this.$emit("select", item, index);
    },
    getDesc(song) {
      return `${song.singer} - ${song.album}`;
    }
  },
  computed: {
    getPadding() {
      return `padding-bottom:${this.imgHeight}px`;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/variable";
@import "../assets/less/mixin";

.song {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: @font-size-medium;
    border-bottom: 1px solid #fafafa;
    &:last-child {
      border: 0 !important;
    }
    .icon-play{
      margin-right: 10px;
      font-size:22px;
      color:#ccc;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: @color-highlight-background;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 4px;
        color: @color-dialog-background;
      }
    }
  }
}
</style>
