<template>
  <div class="container">
    <div class="row">

      <div class="col-sm-6 mx-auto mt-3">
    
        <form @submit.prevent="addWallPost">
          <div class="form-group">
            <label class="label-form-title" for="wall">Создать запись</label>
            <textarea :style="{backgroundColor: selected, color: selectedFont}" @click="resizeRows" placeholder="Что нового?" class="form-control" id="wall" :rows="wallRows" v-model="wallPost.text"></textarea>
            <div class="group-btn">
              <button type="submit" class="btn btn-primary mt-3 mb-2">Опубликовать</button>
              
              <button  @click="showColorBlock" type="button" class="btn btn-outline-success mt-3 mb-2 ml-2">{{editTextButton}}</button>
              
            </div>
            <div class="color-block mt-2" v-if="colorBlock">
                <div class="color-background">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                  
                </div>
                <div class="color-text">
                  <b-form-select v-model="selectedFont" :options="optionsFont"></b-form-select>
                </div>
            </div>
          </div>
        </form>

        <hr>

        <div v-if="myPosts.length">
          <div v-for="p in myPosts" :key="p.id" class="card mt-3">
            <div class="card-body" :style="p.style">
  
              <div class="wall">
                {{ p.text }}
                <div class="wall-block">
                  <img @click="editWallPost(p)" class="wall-block_item pencil" src="../assets/icons8-pencil-24.png" alt="Редактировать">
                  <img @click="deletePost(p.id)" class="wall-block_item times" src="../assets/icons8-delete-26.png" alt="Удалить">
                </div>
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
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      wallRows: 1,
      wallPost: {
        text: ''
      },
      editPost: {},
      editText: '',
      colorBlock: false,
      selected: null,
      selectedFont: null,
      options: [
        { value: null, text: 'Цвет фона' },
        { value: 'aqua', text: 'Aqua' }
        
      ],
      optionsFont: [
        { value: null, text: 'Цвет текста' },
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
        
        const wallPosts = {
          id: wallPostId,
          text: this.wallPost.text,
          style: objStyle
        }
        this.$store.dispatch('createPost', wallPosts)
        this.wallPost.text = ''
        this.selected = null
        this.selectedFont = null
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
    }

  },
  computed: {

    myPosts() { // получение из стора постов
      return this.$store.getters.getPosts
    },
    editTextButton() { // изменение кнопки при значении true/false
      return this.colorBlock ? 'Закрыть': 'Выбрать цвет'
    },
    createStyle() { // извлечение выбранных свойств в блоке выбора цвета
      return {
        backgroundColor: this.selected,
        color: this.selectedFont     
      }
    }

  }
}
</script>

