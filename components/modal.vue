<template>
  <div class="settings__body">
    <div class="settings">
      <div class="settings__top settings__container">
        <h2>{{title}}</h2>
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
        <slot></slot>
      </div>
      <button class="settings__btn" @click="$emit('confirm')">Apply</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
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
    @media ( max-width: 620px ) {
      width: 340px;
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
.settings__btn {
  width: 140px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color);
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
    background: var(--hover-color);
    transition: .3s;
  }
}
</style>