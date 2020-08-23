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

        <div v-for="wallPost in wallPosts" :key="wallPost.id" class="card mt-3">

          <div class="card-body">

            <div class="wall">
              {{ wallPost.text }}
              <div class="wall-block">
                <img @click="editWallPost(wallPost)" class="wall-block_item pencil" src="../assets/icons8-pencil-24.png" alt="Редактировать">
                <img @click="deletePost(wallPost.id)" class="wall-block_item times" src="../assets/icons8-delete-26.png" alt="Удалить">
              </div>
            </div>

            <div v-if="editPost === wallPost" class="mt-2">
              <textarea v-model="editText" class="form-control" id="wall" :rows="wallRows" ></textarea>
              <button @click="addEditWallPost" class="btn btn-primary mt-3 mb-2">Отредактировать</button>
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
      wallCount: 0,
      wallPosts: [],
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
      if (this.wallPost.text) {
        this.wallCount++

        this.wallPosts.unshift({
          id: this.wallCount,
          text: this.wallPost.text
        })
      }
      this.wallPost.text = ''
    },
    deletePost(id) {
      const post_id = this.wallPosts.findIndex(post => post.id === id)
      this.wallPosts.splice(post_id, 1)
    },
    editWallPost(post) {
      this.editPost = post
      this.editText = post.text
    },
    addEditWallPost() {
      this.editPost.text = this.editText
      this.editPost = null
    }
  }
}
</script>

