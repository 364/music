<template>
  <div class="player" v-show="playlist.length > 0">
      <div class="normal-player" v-show="fullScreen">
          <div class="top">
            <div class="back" @click="back">
                <i class="iconfont">&#xe697;</i>
            </div>
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle"  v-html="currentSong.singer"></h2>
          </div>
          <div class="middle">
            <div class="middle-l">
              <div class="cd-wrapper">
                <div class="cd">
                  <img :src="currentSong.image" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="operators">
              <div class="icon i-left">
                <i class="icon-sequence"></i>
              </div>
              <div class="icon i-left">
                <i class="icon-prev"></i>
              </div>
              <div class="icon i-center">
                <i class="icon-play"></i>
              </div>
              <div class="icon i-right">
                <i class="icon-next"></i>
              </div>
              <div class="icon i-right">
                <i class="icon icon-not-favorite"></i>
              </div>
            </div>
          </div>
      </div>
      <div class="mini-player" v-show="!fullScreen">
          <div class="icon">
            <img width="40" height="40" :src="currentSong.image" alt="">
          </div>
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control"></div>
          <div class="control">
            <i class="icon-playlist"></i>
          </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["fullScreen", "playlist", "currentSong"])
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN"
    })
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/variable";
@import "../../assets/less/reset";
@import "../../assets/less/mixin";
.player{
    .normal-player{
      position: fixed;
      left: 50%;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      max-width: 640px;
      width:100%;
      background: white;
      transform: translateX(-50%);
      .top{
        position: relative;
        margin: 10px 5px 25px;
        .back{
          position: absolute;
          top: 50%;
          left: 6px;
          z-index: 50;
          font-size: 1.5rem;
          transform:translateY(-50%);
          .icon-back{
            display: block;
            padding: 9px;
            font-size: @font-size-large-x;
            color: @color-theme;
            transform: rotate(-90deg);
          }
        }
        .title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          .no-wrap();
          font-size: @font-size-large;
          color: @color-highlight-background;
        }
        .subtitle{
          line-height: 20px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-dialog-background;
        }
      }
      .middle{
        position: fixed;
        width: 100%;
        top: 100px;
        bottom: 120px;
        white-space: nowrap;
        font-size: 0;
        border-bottom:1px solid @color-background-w;
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
          .cd-wrapper{
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            .cd{
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(0, 0,0, 0.08);
              border-radius: 50%;
              &.play{
                animation: rotate 20s linear infinite}
              &.pause{
                animation-play-state: paused}
              img{
                position: absolute;
                left: 5px;
                top: 5px;
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                border-radius: 50%;
              }
            }
          }
          .playing-lyric-wrapper{
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;
            .playing-lyric{
              height: 20px;
              line-height: 20px;
              font-size: @font-size-medium;
              color: @color-text-l;
            }
          }
        }
        .middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
          .lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
            .text{
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;
              &.current{
                color: @color-text;}
            }
          }
        }
      }
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper{
          text-align: center;
          font-size: 0;
          .dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
            &.active{
              width: 20px;
              border-radius: 5px;
              background: @color-text-ll;
            }
          }
        }      
        .progress-wrapper{
          display: flex;
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;
          .time{
            color: @color-text;
            font-size: @font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
            &.time-l{
              text-align: left;}
            &.time-r{
              text-align: right;}
          }
          .progress-bar-wrapper{
            flex: 1;}
        }
        .operators{
          display: flex;
          align-items: center;
          .icon{
            flex: 1;
            color: @color-theme;
            &.disable{
              color: @color-theme-d;}
            i{font-size: 30px;}
              
          }
          .i-left{
            text-align: right}
          .i-center{
            padding: 0 20px;
            text-align: center;
            i{font-size: 40px}             
          }
          .i-right{text-align: left}            
          .icon-favorite{
            color: @color-sub-theme;
          }          
        }
      }
      &.normal-enter-active, &.normal-leave-active{
        transition: all 0.4s;
        .top, .bottom{
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }         
      }      
      &.normal-enter, &.normal-leave-to{
        opacity: 0;
        .top{transform: translate3d(0, -100px, 0);}       
        .bottom{transform: translate3d(0, 100px, 0);}
      }    
    }
    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: @color-text-l;
      box-shadow:0px 4px 20px #eee;    
      &.mini-enter-active, &.mini-leave-active{
        transition: all 0.4s;
      }
      &.mini-enter, &.mini-leave-to{
        opacity: 0;
      }
      .icon{
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img{
          border-radius: 50%;
          &.play{
            animation: rotate 10s linear infinite;
          }
          &.pause{
            animation-play-state: paused;
          }
        }
      }
      .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          margin-bottom: 2px;
          .no-wrap();
          font-size: @font-size-medium;
          color: @color-highlight-background;
        }
        .desc{
          .no-wrap();
          font-size: @font-size-small;
          color: @color-dialog-background;
          }
      }
      .control{
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .icon-play-mini, .icon-pause-mini, .icon-playlist{
          font-size: 30px;
          color: @color-theme-d}
        .icon-mini{
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0}
      }
    }
    @keyframes rotate{
    0%{
      transform: rotate(0)
    }     
    100%{
      transform: rotate(360deg);
    }     
  }
}
  
    
</style>
