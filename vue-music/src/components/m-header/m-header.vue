<template>
    <div class="m-header">
        <div class="menu">
          <i class="icon-menu"></i>
        </div>
        <h1 class="text">Music</h1>
        <router-link tag="div" class="search" to="/search">
            <i class="icon-search"></i>
        </router-link>
    </div>
</template>

<script>
</script>

<style scoped lang="stylus">

@import "../../assets/stylus/variable"
@import "../../assets/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon-menu
      display: inline-block
      vertical-align: top
      width: 20px
      height: 20px
      position: absolute
      top: 0
      left: 0
      margin: 12px
      background-image:url('../../assets/images/menu.svg')
      background-size:100%
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .search
      position: absolute
      top: 0
      right: 0
      .icon-search
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme

</style>