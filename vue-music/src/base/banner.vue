<template>
  <div class="banner" v-if="banner.length">
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
    inv: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      nowIndex: 0,
      isStart:true
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
        left: 50%;
        transform: translateX(-50%)
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
        top: 50%;
        transform: translateY(-50%)
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
