<template>
  <div class="container">
    <div class="row">

      <div class="col-sm-6 mx-auto mt-3">
        <form action="">
          <div class="form-group">
            <label class="label-form-title" for="wall">Создать запись</label>
            <textarea @click="resizeRows" placeholder="Что нового?" class="form-control" id="wall" :rows="wallRows"></textarea>
            <button type="button" class="btn btn-primary mt-3 mb-2">Опубликовать</button>
          </div>
        </form>
        <hr>
        <div class="card mt-3">
          <div class="card-body">
            <div class="wall">
              post
              <div class="wall-block">
                <img class="wall-block_item pencil" src="../assets/icons8-pencil-24.png" alt="Редактировать">
                <img class="wall-block_item times" src="../assets/icons8-delete-26.png" alt="Удалить">
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      wallRows: 1
    }
  },
  methods: {
    resizeRows() {
      this.wallRows = 3
    }
  }
}
</script>

