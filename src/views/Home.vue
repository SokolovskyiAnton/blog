<template>
  <div class="container">
    <div class="row">

      <div class="col-sm-6 mx-auto mt-3">

        <form @submit.prevent="addWallPost">
          <div class="form-group">
            <label class="label-form-title" for="wall">Создать запись</label>
            <textarea @click="resizeRows" placeholder="Что нового?" class="form-control" id="wall" :rows="wallRows" v-model="wallPost.text"></textarea>
            <button type="submit" class="btn btn-primary mt-3 mb-2">Опубликовать</button>
          </div>
        </form>
        <hr>
        <div v-for="p in myPosts" :key="p.id" class="card mt-3">
          <div class="card-body">

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
      
    </div>
  </div>
</template>

<script>
// СДЕЛАТЬ возможность переноса текста 

export default {
  name: 'Home',
  data() {
    return {
      wallRows: 1,
      wallPost: {
        text: ''
      },
      editPost: {},
      editText: ''
    }
  },
  methods: {
    resizeRows() {
      this.wallRows = 3
    },

    addWallPost() {
      const wallCount = Date.now()
      
      const wallPosts = {
        id: wallCount,
        text: this.wallPost.text
      }
      this.$store.dispatch('createPost', wallPosts)
      this.wallPost.text = ''
    },
    updatePost() {
      this.$store.dispatch('updatePost', {
        id: this.editPost.id,
        text: this.editText
      })
    },

    deletePost(id) {
      const post_id = this.myPosts.findIndex(post => post.id === id)
      this.myPosts.splice(post_id, 1)
    },

    editWallPost(post) {
      this.editPost = post
      this.editText = post.text
    }

  },
  computed: {

    myPosts() {
      return this.$store.getters.getPosts
    }

  }
}
</script>

