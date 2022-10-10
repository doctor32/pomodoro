<template>
  <div class="pomodoro__body">
     <h1 class="pomodoro__title"
     >pomodoro</h1>
     <nav>
      <ul class="pomodoro__nav_items">
        <li
          v-for="item, i in nav"
          :key="i"
          :class="activeNav === i ? 'active' : '' "
          class="pomodoro__nav_item"
          @click="changePomodoro(i)"
        >
          <p class="pomodoro__nav_item-title">{{item}}</p>
        </li>
      </ul>
     </nav>
     <Timer
        v-for="timer, i in timers" :key="i"
        :minutesTime="timer.minutesTime"
        :leftTime="timer.leftTime"
        :paused="timer.paused"
        :started="timer.started"
        @start="startTimer(i, timer)"
        @restart="restartTimer(i)"
        @pause="pauseTimer(i)"
        v-show="i === activeNav"
        :finished="timer.finished"
     />
     <svg
      class="pomodore__settings"
      width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"
      @click="isOpenSettings = true"
     >
      <g opacity="1">
      <path d="M24.0378 15.365L26.9654 17.682C27.229 17.899 27.3054 18.2771 27.1318 18.578L24.3568 23.429C24.1834 23.73 23.8226 23.849 23.5104 23.73L20.0555 22.323C19.341 22.883 18.557 23.345 17.7106 23.702L17.1903 27.412C17.1348 27.741 16.8504 28 16.5035 28H10.9535C10.6066 28 10.3221 27.741 10.2666 27.412L9.74633 23.702C8.89997 23.345 8.11604 22.8761 7.40145 22.323L3.94654 23.73C3.63435 23.856 3.27364 23.73 3.10018 23.429L0.325132 18.578C0.151671 18.27 0.228028 17.892 0.491634 17.682L3.41927 15.365C3.36379 14.917 3.32216 14.462 3.32216 14C3.32216 13.538 3.36379 13.083 3.41927 12.635L0.491634 10.318C0.228028 10.101 0.151671 9.72302 0.325132 9.42199L3.10025 4.57099C3.27364 4.26996 3.63442 4.15098 3.94661 4.26996L7.40152 5.67697C8.11604 5.11699 8.90003 4.65499 9.74639 4.29799L10.2667 0.588001C10.3222 0.259022 10.6067 0 10.9535 0H16.5036C16.8504 0 17.1348 0.259022 17.1973 0.588001L17.7177 4.29799C18.564 4.65499 19.3479 5.12394 20.0625 5.67697L23.5174 4.26996C23.8296 4.14396 24.1903 4.26996 24.3638 4.57099L27.1389 9.42199C27.3123 9.72997 27.236 10.108 26.9724 10.318L24.0378 12.635C24.0932 13.083 24.1349 13.538 24.1349 14C24.1349 14.462 24.0932 14.917 24.0378 15.365ZM8.8722 14C8.8722 16.709 11.0437 18.9 13.7285 18.9C16.4134 18.9 18.5848 16.7091 18.5848 14.0001C18.5848 11.2911 16.4134 9.10004 13.7285 9.10004C11.0437 9.10004 8.8722 11.291 8.8722 14Z" fill="#D7E0FF"/>
      </g>
     </svg>
     <div class="statistic">
      <p>work time: {{groupTime(0)}} min</p>
      <p>short break: {{groupTime(1)}} min</p>
      <p>long break: {{groupTime(2)}} min</p>
     </div>
      <Settings
        v-show="isOpenSettings"
        @confirmSettings="confirmSettings($event)"
        @close="closeSettings"
      />

      <div class="to-do-item">
        <createToDoTask />
      </div>

      <Helper v-if="$store.state.showFAQ"/>

  </div>
</template>

<script>
import Timer from "../components/timer.vue";
import Settings from "../components/settings.vue";
import CreateToDoTask from '../components/createToDoTask.vue';
export default {
    name: "IndexPage",
    layout: "default",
    data() {
        return {
            nav: ["pomodoro", "short break", "long break"],
            activeNav: 0,
            isOpenSettings: false,
            finished: false,
            timers: [
              {
                name: 'pomodoro',
                paused: false,
                leftTime: 0,
                minutesTime: 0.1,
                started: false,
                finished: false,
                total: 0
              },
              {
                name: 'short break',
                paused: false,
                leftTime: 0,
                minutesTime: 5,
                started: false,
                finished: false,
                total: 0
              },
              {
                name: 'long break',
                paused: false,
                leftTime: 0,
                minutesTime: 15,
                started: false,
                finished: false,
                total: 0
              }
            ],
        };
    },
    computed: {
    },
    mounted() {
      if ( process.browser ) {
        if (!localStorage.getItem('isFaqRead')) {
        this.$store.commit('changeFaqStatus', true)
      }
      }

      this.timers.forEach(elem => {
        elem.leftTime = elem.minutesTime * 60
      })
    },
    methods: {
      changePomodoro(index) {
        this.activeNav = index;
      },
      startTimer(i, item) {
        this.timers[i].finished = false
        if (!this.timers[i].started) {
          this.timers[i].started = true
        }
        if (this.timers[i].leftTime) {
        this.timers[i].paused = false
        let timer = setInterval(() => {
          console.log(this.timers[i].finished);
          if (this.timers[i].leftTime == 0) {
            this.timers[i].finished = true
          }
          if (this.timers[i].leftTime == 0 || this.timers[i].paused) {
            clearInterval(timer)
            this.timers[i].paused = true
          } else {
            this.changeTime(i)
          }
          }, 1000)
        }
      },
      restartTimer(i) {
        this.timers[i].leftTime = this.timers[i].minutesTime * 60
        this.startTimer(i)
      },
      changeTime(i) {
        this.timers[i].leftTime--
        this.timers[i].total++
        console.log(this.timers[i].total)
      },
      pauseTimer(i) {
        console.log(this.timers)
        this.timers[i].paused = true
      },
      confirmSettings(inputs) {
        inputs.forEach((element, index) => {
          this.timers[index].minutesTime = element.value
          this.timers[index].leftTime = element.value * 60
        })
        this.timers.forEach(elem => {
          elem.started = false
        })
        this.closeSettings()
      },
      closeSettings() {
        this.isOpenSettings = false
      },
      groupTime(index) {
          return Math.floor(this.timers[index].total / 60)
      }
    },
    components: { Timer, Settings, CreateToDoTask }
}
</script>

<style lang="scss" scoped>
  .pomodoro__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }
  .to-do-item {
    width: 330px;
    height: 550px;
    position: absolute;
    left: 0;
    top: 100px;
    width: 500px;
    height: 500px;
    @media ( max-width: 1440px ) {
      width: 100%;
      top: 700px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    @media ( max-width: 480px ) {
      width: 100%;
      top: 770px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .pomodoro__title {
    font-size: 32px;
  }
  nav {
    z-index: 3;
  }
  .pomodoro__nav_items {
    margin: 55px 0 45px 0;
    background: #161932;
    border-radius: 31.5px;
    display: flex;
    justify-content: center;
    width: 420px;
    padding: 7px;
    gap: 3px;
    @media ( max-width: 480px ) {
      flex-direction: column;
      width: 200px;
      margin: 35px 0 35px 0;
    }
  }
  .pomodoro__nav_item {
    cursor: pointer;
    width: 100%;
    border-radius: 26.5px;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    &.active {
      transition: .3s;
      background: var(--color);
      .pomodoro__nav_item-title {
        color: black;
      }
    }
  }
  .pomodoro__nav_item-title {
    font-size: 14px;
  }
  .pomodore__settings {
    cursor: pointer;
    transition: .5s;
    margin-top: 60px;
    &:hover {
      transform: rotate(360deg);
      transition: .5s;
      path {
        fill: var(--color);
      }
    }
  }
  .statistic {
    position: fixed;
    bottom: 20px;
    right: 20px;
    opacity: .5;
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media ( max-width: 1440px ) {
      top: 20px;
    }
    @media ( max-width: 1070px ) {
      display: none;
    }
  }
</style>