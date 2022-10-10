<template>
<Modal
  title="FAQ"
  :btnText="finished ? 'Finish' : 'Next' "
  @confirm="nextSlide"
  @close="saveFaqStatus"
>
  <div class="faq__body"
    v-for="item, i in FAQ"
    :key="i"
  >
    <template v-if="i === currentTab">
      <img :src="item.img" alt="">
      <p class="faq__body_title">{{i + 1}}. {{item.title}}</p>
      <p class="faq__body_subtitle">{{item.subtitle}}</p>
      <div class="switchers">
        <button class="switch__btn"
          v-for="_, j in FAQ.length"
          :class="j == currentTab ? 'active' : ''"
          :key="j"
          @click="clickOnSwitch(j)"
        >
        </button>
      </div>
    </template>
  </div>
</Modal>
</template>

<script>
import Modal from './modal.vue';
  export default {
    components: { Modal },
    data() {
      return {
        currentTab: 0,
        finished: false,
        FAQ: [
          {
            title: 'Timer',
            subtitle: 'You can switch modes under timer circle, use 2 kinds of breaks',
            img: require('@/assets/img/Screenshot_1.png')
          },
          {
            title: 'Settings',
            subtitle: 'Customize here the timer for yourself, as well as the font and color theme',
            img: require('@/assets/img/Screenshot_3.png')
          },
          {
            title: 'To do List',
            subtitle: 'Specify your tasks, mark them after completion',
            img: require('@/assets/img/Screenshot_2.png')
          }
        ]
      }
    },
    methods: {
      nextSlide() {
        if (!this.finished) {
          if (this.currentTab < this.FAQ.length) {
          this.currentTab++
            if (this.currentTab == this.FAQ.length - 1) {
              this.finished = true
            }
          }
        } else {
          this.saveFaqStatus()
        }
      },
      saveFaqStatus() {
        this.$store.commit('changeFaqStatus', false)
        localStorage.setItem('isFaqRead', true)
      },
      clickOnSwitch(i) {
        this.currentTab = i
        if (this.currentTab == this.FAQ.length - 1) {
          this.finished = true
        } else {
          this.finished = false
        }
      }
    }
}
</script>

<style lang="scss" scoped>
  img {
    width: 80%;
    height: 250px;
    object-fit: cover;
    @media ( max-width: 620px ) {
      height: 140px;
    }
  }
  .faq__body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .faq__body_title {
    font-size: 26px;
    padding: 20px 0 10px 0;
    @media ( max-width: 620px ) {
      font-size: 20px;
    }
  }
  .faq__body_subtitle {
    text-align: center;
    line-height: 150%;
    height: 48px;
    @media ( max-width: 620px ) {
      font-size: 14px;
    }
  }
  .switchers {
    display: flex;
    width: 100%;
    gap: 25px;
    justify-content: center;
    margin-top: 20px;
  }
  .switch__btn {
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    background: rgb(223, 223, 223);
    border-radius: 50%;
    padding: 0;
    &.active {
      background: var(--color);
    }
  }
</style>