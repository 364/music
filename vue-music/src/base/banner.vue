<template>
  <div class="banner" v-if="banner.length">
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in banner" :key="index">
            <a :href="banner[index].linkUrl">
                <img :src="banner[index].picUrl" >
            </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" id="pagination"></div>  
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banner: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      swiperOption: {
        //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        loop: true, //循环
        autoplay: {
          delay: 2000,
          disableOnInteraction: false //操作之后继续自动播放
        },
        direction: "horizontal", //水平 垂直：vertical
        paginationType: "bullets", //圆点bullets  进度条progress 自定义custom
        grabCursor: true, //拖动时指针会变成抓手形状
        setWrapperSize: true, //使用flexbox布局(display: flex)
        pagination: {
          el: ".swiper-pagination",
          clickable: true//分页点击
        },
        // slidesPerView: "auto",
        centeredSlides: true
      }
    };
  },
  mounted() {
    //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
    //this.swiper.slideTo(0, 0, false);
  },
  computed: {
    swiper() { 
      return this.$refs.mySwiper.swiper;
    }
    
  }
};
</script>

<style>
.banner img {
  width: 100%;
}
.swiper-pagination-bullet{
    background: white;
} 
.swiper-pagination-bullet-active{
    background: #ffcc33;
}
</style>
