<template>
    <div class="container" id="login">
        <div>
            <h2 class="mt-3 text-center">Вход</h2>
            <form @submit.prevent="sendForm">
                <div class="form-group">
                  <label for="idEmail">Почтовый ящик</label>
                  <input v-model="email" type="email" class="form-control" id="idEmail" placeholder="Введите название">
                </div>
                <div class="form-group">
                  <label for="idPassword">Пароль</label>
                  <input v-model="password" type="password" class="form-control" id="idPassword" placeholder="Пароль">
                </div>
                <button style="width: 150px;" type="submit" class="btn btn-primary">Войти</button>
                <p class="mt-3">Вы не зарегистрированы ? <router-link to="/register">Нажмите сюда</router-link> </p>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
    async sendForm() {
            const formData = {

                email: this.email,
                password: this.password
            }

            try {
                await this.$store.dispatch('login', formData)
                this.$router.push('/home')
            }
            catch(e) {}
        }
    }

}
</script>

<style scoped>

</style>