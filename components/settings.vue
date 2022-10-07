<template>
  <div class="settings__body">
    <div class="settings">
      <div class="settings__top settings__container">
        <h2>Settings</h2>
        <svg
          class="settings__close"
          width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          @click="$emit('close')"
        >
          <g opacity="0.5">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.364 2.0502L11.9497 0.635986L6.99999 5.58573L2.05025 0.635986L0.636032 2.0502L5.58578 6.99995L0.636032 11.9497L2.05025 13.3639L6.99999 8.41416L11.9497 13.3639L13.364 11.9497L8.41421 6.99995L13.364 2.0502Z" fill="#1E213F"/>
          </g>
        </svg>
      </div>
      <div class="settings__hr"></div>
      <div class="settings__bottom settings__container">
        <div class="settings__minutes">
          <p class="settings__bottom_title">time (minutes)</p>
          <div class="settings__minutes_inputs">
            <div class="settings__minutes_input-body" v-for="item, i in inputs" :key="i">
              <p class="settings__minutes_input-title">{{item.name}}</p>
              <div class="settings__minutes_input">
                <input type="number" @input="onInputMinutes(item)" v-model="item.value">
                <div class="settings__minutes_input-btns">
                  <svg @click="changeQnt(item, '+')" class="settings__minutes_input-btn settings__minutes_input-btn-up" width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L7 2L13 6" stroke="#1E213F" stroke-opacity="0.25" stroke-width="2"/>
                  </svg>
                  <svg @click="changeQnt(item, '-')" class="settings__minutes_input-btn settings__minutes_input-btn-down" width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L7 2L13 6" stroke="#1E213F" stroke-opacity="0.25" stroke-width="2"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="settings__hr"></div>
        <div class="settings__fonts">
          <p class="settings__bottom_title">font</p>
          <div class="settings__fonts_body">
            <div class="settings__font"
              v-for="font, i in 3"
              :key="i"
              :class="fontActive === i ? 'active' : ''"
              @click="fontActive = i"
              >
                Aa
            </div>
          </div>
        </div>
        <div class="settings__hr"></div>
        <div class="settings__colors">
          <p class="settings__bottom_title">color</p>
          <div class="settings__colors_body">
            <div
              class="settings__color"
              v-for="color, i in colors"
              :key="i"
              :style="`background: ${color}`"
              @click="colorActive = i"
              >
              <svg class="settings__color-mark" v-if="colorActive == i" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button class="settings__btn" @click="confirmSettings">Apply</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputs: [
          {
            name: 'pomodoro',
            value: 0
          },
          {
            name: 'short break',
            value: 0
          },
          {
            name: 'long break',
            value: 0
          }
        ],
        colors: ['#F87070', '#70F3F8', '#D881F8'],
        colorActive: 0,
        fontActive: 0,
      }
    },
    methods: {
      onInputMinutes(input) {
        input.value >= 999 ? input.value = 999 : false
        input.value <= 0 ? input.value = 0 : false
      },
      changeQnt(input, selector) {
        if (selector === '+') {
          input.value >= 999 ? input.value = 999 : input.value++
        } else {
          input.value <= 0 ? input.value = 0 : input.value--
        }
      },
      confirmSettings() {
        this.$emit('confirmSettings', this.inputs)
      },
    },
    watch: {
      input() {
        if (this.input >= 999) {
          this.input = 999
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settings__body {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100vh;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .settings {
    position: relative;
    background: white;
    border-radius: 25px;
    width: 540px;
    padding: 30px 0 60px 0;
    color: black;
    h2 {
      font-size: 28px;
      line-height: 35px;
    }
  }
  .settings__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .settings__close {
    cursor: pointer;
    transition: .5s;
    &:hover {
      transform: rotate(360deg);
      transition: .5s;
    }
  }
  .settings__container {
    padding: 0 40px;
  }
  .settings__hr {
    width: 100%;
    height: 1px;
    background: black;
    opacity: .1;
    margin: 25px 0;
  }
  .settings__bottom {
  }
  .settings__minutes {
  }
  .settings__bottom_title {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
  .settings__minutes_inputs {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
  .settings__minutes_input-body {
  }
  .settings__minutes_input-title {
    font-size: 12px;
    line-height: 15px;
    mix-blend-mode: normal;
    opacity: 0.4;
    padding-bottom: 8px;
  }
  .settings__minutes_input {
    background: #EFF1FA;
    border-radius: 10px;
    padding: 16px;
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      user-select: none;
      color: black;
      width: 100%;
      background: #EFF1FA;
      &:focus {
        outline: none;
      }
    }
  }
  .settings__minutes_input-btns {
    z-index: 2;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }
  .settings__minutes_input-btn {
    cursor: pointer;
  }
  .settings__minutes_input-btn-up {
  }
  .settings__minutes_input-btn-down {
    transform: rotate(180deg);
  }
  .settings__fonts {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .settings__fonts_body {
    display: flex;
    gap: 16px;
  }
  .settings__font {
    background: #EFF1FA;
    font-size: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.active {
      background: #161932;
      color: white;
    }
  }
  .settings__colors {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .settings__colors_body {
    display: flex;
    gap: 16px;
  }
  .settings__color {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.settings__btn {
  width: 140px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F87070;
  color: white;
  border-radius: 26.5px;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: -25px;
  transition: .3s;
  &:hover {
    background: #F98D8D;
    transition: .3s;
  }
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none; // Yeah, yeah everybody write about it
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
</style>