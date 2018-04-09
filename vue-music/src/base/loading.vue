<template>
  <div class="loading">
    <img width="24" height="24" src="../assets/images/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      title: "正在载入"
    };
  }
};
</script>
<style scoped lang="less">
@import "~assets/less/variable";
.loading {
  position: absolute;
  top:30%;
  left:50%;
  text-align: center;
  transform: translate(-50%,-50%);

  p {
    line-height: 20px;
    font-size: @font-size-small;
    color: @color-theme;
  }
}
</style>
