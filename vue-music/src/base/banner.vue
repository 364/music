<template>
  <div class="banner" >
    <div class="slide-img">
        <a :href="banner[nowIndex].linkUrl">
            <img :src="banner[nowIndex].picUrl" />
        </a>
    </div>
    <ul class="slide-btn">
        <li v-for="(item,index) in banner" :class="{on: index === nowIndex}" @click="goto(index)"></li>
    </ul>
    <li @click="goto(prevIndex)" class="prev comm"><img src="../assets/images/prev.svg" /></li>
    <li @click="goto(nextIndex)" class="next comm"><img src="../assets/images/next.svg" /></li>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default: []
    },
    loop: {
      type: Boolean,
      default: true
    },
    auto: {
      type: Boolean,
      default: true
    },
    inv: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      nowIndex: 0,
      isShow: true //停止循环
    };
  },
  mounted() {
      this.runInv()
  },
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.banner.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      if (this.nowIndex === this.banner.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    goto(index) {
        this.nowIndex = index;
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv() {
      clearInterval(this.invId);
    }
  },
  watch: {
    banner(newValue, oldValue) {
      console.log(newValue);
    }
  }
};
</script>

<style lang="stylus" scoped>
.banner {
    position: relative;

    .slide-img a img {
        width: 100%;
        display: inline-block;
    }

    .slide-btn {
        position: absolute;
        bottom: 5px;
        left: 40%;
        list-style: none;
        margin: auto;

        li {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: rgba(255,255,255,0.3);
            border-radius: 100%;
            margin-right: 10px;
        }

        .on {
            background: #fff;
        }
    }

    .comm {
        top: 40%;
        width: 30px;
        position: absolute;

        img {
            width: 100%;
        }
    }

    .prev {
        left: 0;
    }

    .next {
        right: 0;
    }
}
</style>
