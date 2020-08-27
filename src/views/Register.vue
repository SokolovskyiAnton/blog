<template>
    <div class="container" id="login">
        <div>
            <h2 class="mt-3 text-center">Регистрация</h2>
            <form @submit.prevent="sendForm">
                <div class="form-group">
                  <label for="idEmail">Почтовый ящик</label>
                  <input v-model="email" type="email" class="form-control" id="idEmail" placeholder="Введите название">
                </div>
                <div class="form-group">
                  <label for="idPassword">Пароль</label>
                  <input v-model="password" type="password" class="form-control" id="idPassword" placeholder="Пароль">
                </div>
                <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                <p class="mt-3">Уже есть аккаунт ? <router-link to="/">Нажмите сюда</router-link> </p>
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
        sendForm() {
            console.log(1);
        }
    }

}
</script>