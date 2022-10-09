<template>
  <div class="timer__body">
    <div class="timer__background">
      <svg class="timer_svg">
        <Circle cx="150" cy="150" r="134"
          :style="stroke_dashoffset"
        ></Circle>
      </svg>
      <p class="timer__numbers">{{minutes}}:{{seconds}}</p>
      <div class="timer__btns">
        <p v-if="started && !paused && leftTime > 0" class="timer__switcher" @click="pause">pause</p>
        <p v-if="!started || started && paused && leftTime > 0" class="timer__switcher" @click="start">start</p>
        <div v-if="leftTime === 0 && started" class="timer__restart">
          <p class="timer__switcher" @click="restart">restart</p>
          <p class="timer__previous">Previous time: {{previous}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['minutesTime', 'leftTime', 'paused', 'started', 'finished'],
    data () {
      return {
        t: 0
      }
    },
    watch: {
      finished() {
        if (this.finished === true) {
          this.playSound('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')
        }
      }
    },
    methods: {
      playSound (sound) {
        const audio = new Audio(sound)
        const int = setInterval(() => {
          this.t++
          audio.play()
          if (this.t > 100) {
            clearInterval(int)
            this.t = 0
          }
        }, 100)
      },
      start() {
        this.$emit('start')
      },
      restart() {
        this.$emit('restart')
      },
      pause() {
        this.$emit('pause')
      }
    },
    computed: {
      timerPercent() {
        return  100 - (this.leftTime * 100) / (this.minutesTime * 60)
      },
      stroke_dashoffset() {
        return 'stroke-dashoffset:' + (843 - (843 * this.timerPercent) / 100)
      },
      seconds() {
        const seconds = this.leftTime % 60
        if (seconds < 10) {
          return '0' + seconds
        } else {
          return seconds
        }
      },
      minutes() {
        const minutes = Math.floor(this.leftTime / 60)
        if (minutes < 10) {
          return '0' + minutes
        } else {
          return minutes
        }
      },
      previous() {
        return this.minutesTime + ' minutes'
      }
    }
  }
</script>

<style lang="scss" scoped>
.timer__body {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  box-shadow: -50px -50px 100px #272C5A, 50px 50px 100px #121530;
  padding: 22px;
}
.timer__background {
  position: relative;
  background: #161932;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.timer__numbers {
  font-size: 80px;
  letter-spacing: -5px;
  line-height: 100%;
}
.timer__switcher {
  padding-left: 15px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 15px;
  text-transform: uppercase;
  z-index: 2;
  &:hover {
    color: var(--hover-color);
    transition: .3s;
  }
}
.timer__restart {
  z-index: 2;
}
.timer_svg {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100%;
  height: 100%;
  circle {
    fill: none;
    stroke-width: 8;
    stroke: var(--color);
    stroke-dasharray: 843;
    transition: .75s;
  }
}
.timer__btns {
  z-index: 2;
  height: 55px;
}
.timer__previous {
  padding-top: 10px;
  opacity: .5;
  font-size: 12px;
  text-align: center;
}

</style>