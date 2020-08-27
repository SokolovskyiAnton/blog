<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Блог</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click="logout" class="nav-link">Выйти</a>
          </li>
        </ul>  
      </div>
    </nav>
</template>

<script>
export default {
    methods: {
      async logout() {
        await this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
}
</script>

<style>

</style>