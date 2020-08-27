<template>
<div><Navbar/>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 mx-auto mt-3">
        <form @submit.prevent="addWallPost">
          <div class="form-group">

            <label class="label-form-title" for="wall">Создать запись</label> 
            <textarea :style="{backgroundColor: selected, color: selectedFont, fontSize: selectedSize + 'px'}" @click="resizeRows" placeholder="Что нового?" class="form-control" id="wall" :rows="wallRows" v-model="wallPost.text"></textarea>

            <div class="group-btn">
              <button type="submit" class="btn btn-primary mt-3 mb-2">Опубликовать</button>

              <button  @click="showColorBlock" type="button" class="btn btn-outline-success mt-3 mb-2 ml-2">{{editTextButton}}</button>
              
              <button @click="sort = !sort" @mouseup="sortPosts" type="button" class="btn-settings"><img class="sort-img" width="30px" height="30px" src="../assets/sort1.svg" alt="Сортировать" :class="{sort: sort}"></button>
              <button @click="search = !search" type="button" class="btn-settings"><img class="search-img" width="30px" height="30px" src="../assets/find.svg" alt="Сортировать" :class="{search: search}"></button>
            </div>

            <div class="color-block mt-2" v-if="colorBlock">
                <div class="block-width color-background">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                </div>
                <div class="block-width color-text">
                  <b-form-select v-model="selectedFont" :options="optionsFont"></b-form-select>
                </div>
                <div class="block-width text-size">
                  <label for="customRange1">Размер текста: {{selectedSize}}</label>
                  <input type="range" class="custom-range" id="customRange1" min="15" max="40" v-model="selectedSize">
                </div>
            </div>

            <div class="search-block mt-2" v-if="search">
              <input class="search-block_input" type="text" v-model="textSearch" placeholder="Поиск..."/>
            </div>

          </div>
        </form>

        <hr>

        <div v-if="myPosts.length">
          <div v-for="p in filteredList" :key="p.id" class="card mt-3">
            <div class="card-body" :style="p.style">
              <div class="wall">
                {{ p.text }}
                <div @click="openSettingsBlock(p)" class="block-points">
                  <div class="points" :class="{active: p.settings}"></div>
                </div>
                <transition name="fade">
                  <div class="settings-block"  v-if="p.settings">
                    <hr>
                    <div class="settings-block-wrap">
                      <div class="settings-block-date"><i>{{p.date.day}}.{{p.date.month}}.{{p.date.year}}</i><i class="ml-2">{{p.date.hours}}:{{p.  date.minutes}}</i></div>
                      <div class="settings-block-images">
                        <img @click="editWallPost(p)" class="settings-block-images_item pencil" src="../assets/icons8-pencil-24.png"   alt="Редактировать">
                        <img @click="deletePost(p.id)" class="settings-block-images_item times" src="../assets/icons8-delete-26.png" alt="Удалить">
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
  
              <div v-if="editPost === p" class="mt-2">
                <textarea v-model="editText" class="form-control" id="wall" :rows="wallRows" ></textarea>
                <button @click="updatePost" class="btn btn-primary mt-3 mb-2">Отредактировать</button>
              </div>
              
            </div>
          </div>
        </div>
        <div v-else><div class="block-field"><img class="field" src="../assets/поле.png" alt=""></div></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      textSearch: '',
      sort: false,
      wallRows: 1,
      wallPost: {
        text: ''
      },
      editPost: {},
      editText: '',
      search: false,
      colorBlock: false,
      selected: null,
      selectedFont: null,
      selectedSize: null,
      options: [
        { value: null, text: 'Цвет фона' },
        { value: 'aqua', text: '' },
        { value: 'darkred', text: '' },
        { value: 'deeppink', text: '' },
        { value: 'orangered', text: '' },
        { value: 'yellow', text: '' }
        
      ],
      optionsFont: [
        { value: null, text: 'Цвет текста' },
        { value: 'white', text: 'Белый' },
        { value: 'darkred', text: 'Темно-красный' },
        { value: 'yellow', text: 'Желтый' },
        { value: 'red', text: 'Красный' }
      ]
    }
  },
  methods: {
    resizeRows() {
      this.wallRows = 3
    },

    addWallPost() {
      if (this.wallPost.text) {
        const wallPostId = Date.now()
        const objStyle = this.createStyle
        const newDate = new Date()
        const wallPosts = {
          id: wallPostId,
          text: this.wallPost.text,
          style: objStyle,
          date: {
            fullYear: newDate,
            year: newDate.getFullYear(),
            day: newDate.getDate(),
            month: newDate.getMonth(),
            hours: newDate.getHours(),
            minutes: newDate.getMinutes()
          },
          settings: false
          
        }
        this.$store.dispatch('createPost', wallPosts)
        this.wallPost.text = ''
        this.selected = null
        this.selectedFont = null
        this.selectedSize = '15'
        this.datePicker = null
      }

    },
    updatePost() {
      this.$store.dispatch('updatePost', {
        id: this.editPost.id,
        text: this.editText
      })
      this.editPost = null
  
    },

    deletePost(id) {
      const post_id = this.myPosts.findIndex(post => post.id === id)
      this.$store.dispatch('deletePost', {
        id: post_id
      }) 
    },

    editWallPost(post) {
      this.editPost = post
      this.editText = post.text
    },

    showColorBlock() { // скрыть/показать блок с настройкой цвета
      this.colorBlock = !this.colorBlock 
    },

    openSettingsBlock(post) {
      const arr = post
      arr.settings = !arr.settings
    },

    sortPosts() {
      this.myPosts.reverse()
    }

  },
  computed: {

    myPosts() { // получение из стора постов
      return this.$store.getters.getPosts
    },

    editTextButton() { // изменение кнопки при значении true/false
      return this.colorBlock ? 'Закрыть': 'Настройки'
    },
    
    createStyle() { // извлечение выбранных свойств в блоке выбора цвета
      return {
        backgroundColor: this.selected,
        color: this.selectedFont,
        fontSize: this.selectedSize + 'px',
        date: this.datePicker
      }
    },
    filteredList() {
      const srchText = this.textSearch;
      return this.myPosts.filter(function (elem) {
       
          if (srchText==='') return true;
          else return elem.text.indexOf(srchText) > -1;
      })
    }

  }
}
</script>

<style scoped>

</style>