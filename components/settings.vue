<template>
<Modal
  @confirm="confirmSettings()"
  @close="$emit('close')"
  title="Settings"
>
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
        v-for="item, i in fonts"
        :style="fontStyle(item)"
        :key="i"
        :class="fontActive === i ? 'active' : ''"
        @click="activateFont(i, item)"
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
        v-for="item, i in colors"
        :key="i"
        :style="`background: ${item.color}`"
        @click="chooseColor(i, item)"
        >
        <svg class="settings__color-mark" v-if="colorActive == i" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</Modal>
</template>

<script>
import Modal from './modal.vue'
  export default {
    data() {
        return {
            inputs: [
                {
                    name: "pomodoro",
                    value: 0
                },
                {
                    name: "short break",
                    value: 0
                },
                {
                    name: "long break",
                    value: 0
                }
            ],
            colors: [
              {
                color: "#F87070",
                theme: ''
              },
              {
                color: "#70F3F8",
                theme: 'blue'
              },
              {
                color: "#D881F8",
                theme: 'violet'
              }
            ],
            colorActive: 0,
            fontActive: 0,
            fonts: ["Kumbh Sans, sans-serif", "Roboto Slab, serif", "Space Mono, monospace"],
            font: "Kumbh Sans, sans-serif",
            theme: ''
        }
    },
    methods: {
        activateFont(i, font) {
          this.fontActive = i
          this.font = font
        },
        onInputMinutes(input) {
            input.value >= 999 ? input.value = 999 : false;
            input.value <= 0 ? input.value = 0 : false;
        },
        changeQnt(input, selector) {
            if (selector === "+") {
                input.value >= 999 ? input.value = 999 : input.value++;
            }
            else {
                input.value <= 0 ? input.value = 0 : input.value--;
            }
        },
        confirmSettings() {
            this.$emit("confirmSettings", this.inputs)
            document.body.style.fontFamily = this.font
            document.querySelector('.default').classList.remove('blue', 'violet')
            console.log(this.theme);
            document.querySelector('.default').classList.add(this.theme)
        },
        fontStyle(item) {
          return "font-family: " + item
        },
        chooseColor(i, item) {
          this.colorActive = i
          this.theme = item.theme
        }
    },
    components: { Modal }
}
</script>

<style lang="scss" scoped>
  .settings__hr {
    width: 100%;
    height: 1px;
    background: black;
    opacity: .1;
    margin: 25px 0;
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
//REMOVE INPUT ARROWS!!!
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
/* Firefox */
input[type=number] {
-moz-appearance: textfield;
}
</style>