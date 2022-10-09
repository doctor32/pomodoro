<template>
<div class="to-do__body">
  <h3 class="to-do__title">to do list</h3>
  <p class="to-do__delete-all"
    :class="toDoList.length > 1 ? 'active' : '' "
    @click="deleteAllTasks"
  >
    delete all
  </p>
  <p class="to-do__clear" v-if="toDoList.length == 0">it is a note box. make your first one!</p>
  <div class="to-do__items" v-else>

    <div class="to-do__item"
      v-for="item, i in toDoList"
      :key="i"
      :class="item.finished ? 'active' : ''"
      draggable="true"
      >
      <div class="to-do__item_mark"
        @click="mark(item)"
      >
        <svg width="10" height="10" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.67074 0L2.702 4.49999L1.54979 3.60019H0.909668L2.702 6.6L7.31086 0H6.67074Z" fill="black"/>
        </svg>
      </div>
      <div class="to-do__item_text" :class="item.finished ? 'active' : ''">{{item.text.toLowerCase()}}</div>
      <div class="to-do__item_delete" @click="deleteItem(i)">
        <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.27344 2.69531H5.15625C5.2207 2.69531 5.27344 2.64258 5.27344 2.57812V2.69531H9.72656V2.57812C9.72656 2.64258 9.7793 2.69531 9.84375 2.69531H9.72656V3.75H10.7812V2.57812C10.7812 2.06104 10.3608 1.64062 9.84375 1.64062H5.15625C4.63916 1.64062 4.21875 2.06104 4.21875 2.57812V3.75H5.27344V2.69531ZM12.6562 3.75H2.34375C2.08447 3.75 1.875 3.95947 1.875 4.21875V4.6875C1.875 4.75195 1.92773 4.80469 1.99219 4.80469H2.87695L3.23877 12.4658C3.26221 12.9653 3.67529 13.3594 4.1748 13.3594H10.8252C11.3262 13.3594 11.7378 12.9668 11.7612 12.4658L12.123 4.80469H13.0078C13.0723 4.80469 13.125 4.75195 13.125 4.6875V4.21875C13.125 3.95947 12.9155 3.75 12.6562 3.75ZM10.7124 12.3047H4.2876L3.93311 4.80469H11.0669L10.7124 12.3047Z" fill="#F87070"/>
        </svg>
      </div>
    </div>
  </div>
  <button class="to-do__btn"
    @click="isCreatingNewTask = true"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C20.8027 6.94749 20.8763 6.8376 20.9264 6.71663C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8763 5.83241 20.8027 5.72252 20.71 5.63L18.37 3.29C18.2775 3.1973 18.1676 3.12375 18.0466 3.07357C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07357C17.1624 3.12375 17.0525 3.1973 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#1E213F"/>
    </svg>
  </button>


  <Modal v-if="isCreatingNewTask"
    title="Create task"
    @close="isCreatingNewTask = false"
    @confirm="saveNewTask"
  >
    <textarea v-model="newTask"></textarea>
  </Modal>
</div>
</template>

<script>
import Modal from './modal.vue';
  export default {
    components: { Modal },
    data() {
      return {
        newTask: '',
        isCreatingNewTask: false,
        toDoList: [
          {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum laborum nostrum tempora iure nobis? Tenetur ab magni in nihil consequuntur perspiciatis eum officia asperiores ',
            finished: true
          },
          {
            text: 'Lorem ipsum dolor sit amet  ',
            finished: false
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur 201 Lorem ipsum dolor sit amet consectetur',
            finished: false
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum laborum nostrum tempora iure nobis? Tenetur ab magni in nihil consequuntur perspiciatis eum officia asperiores ',
            finished: true
          },
          {
            text: 'Lorem ipsum dolor sit amet  ',
            finished: false
          }
        ],
        color: 'red'
      }
    },
    methods: {
      saveNewTask() {
        this.toDoList.push({
          text: this.newTask,
          finished: false
        })
        this.isCreatingNewTask = false
        this.newTask = ''
      },
      mark(item) {
        item.finished = !item.finished
      },
      deleteItem(i) {
        this.toDoList.splice(i, 1)
      },
      deleteAllTasks() {
        this.toDoList = []
      }
    }
}
</script>

<style lang="scss" scoped>
.to-do__body {
  width: 330px;
  background: #161932;
  padding: 20px 25px;
  height: 550px;
  color: #D7E0FF;
  box-shadow: 7px 6px 50px rgba(248, 112, 112, 0.02);
  border-radius: 0 25px 25px 0;
  position: relative;
  @media ( max-width: 1440px ) {
    width: 700px;
    margin: 0 auto;
    height: 400px;
    border-radius: 25px;
  }
  @media ( max-width: 760px ) {
    width: 480px;
    height: 450px;
  }
  @media ( max-width: 520px ) {
    width: 380px;
  }
  @media ( max-width: 420px ) {
    width: 360px;
    height: 650px;
  }
}
.to-do__title {
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 15px;
  padding-bottom: 15px;
}
.to-do__items {
  overflow-y: scroll;
  height: 370px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media ( max-width: 1440px ) {
    height: 230px;
  }
  @media ( max-width: 760px ) {
    height: 280px;
  }
  @media ( max-width: 420px ) {
    height: 490px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    height: 2px;
    display: block;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    -webkit-border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 50px;
    background-color: var(--color);
    -webkit-border-radius: 6px;
  }
}
.to-do__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.active {
    .to-do__item_mark {
      background: var(--color);
    }
  }
}
.to-do__item_mark {
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px !important;
  height: 15px !important;
  background: #272B50;
  cursor: pointer;
  border-radius: 100%;

}
.to-do__item_text {
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  color: #D7E0FF;
  opacity: 0.6;
  width: 200px;
  &:hover {
    opacity: 1;
  }
  &.active {
    opacity: .1;
    cursor: auto;
  }
  @media ( max-width: 1440px ) {
    width: 90%;
  }
  @media ( max-width: 520px ) {
    width: 80%;
  }
}
.to-do__item_delete {
  cursor: pointer;
  padding-right: 10px;
  svg {
    opacity: .5;
    path {
      fill: var(--color);
    }
    &:hover {
      opacity: 1
    }
  }
}
.to-do__btn {
  background: var(--color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  transition: .3s;
  position: absolute;
  bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  &:hover {
    transition: .3s;
    background: var(--hover-color)
  }
}
.to-do__delete-all {
  text-align: end;
  padding-right: 14px;
  font-size: 12px;
  padding-bottom: 5px;
  cursor: pointer;
  opacity: 0;
  &.active {
    opacity: .2;
  }
  &.active:hover {
    color: var(--hover-color);
    opacity: 1;
    transition: .3s;
  }
}
.to-do__clear {
  opacity: .3;
  text-align: center;
  padding-top: 20px;
  position: absolute;
}
textarea {
  background: #EFF1FA;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  padding: 10px 20px;
  font: inherit;
  &:focus{
    outline: none;
    resize: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    height: 2px;
    display: block;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    -webkit-border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 50px;
    background-color: var(--color);
    -webkit-border-radius: 6px;
  }
}

</style>