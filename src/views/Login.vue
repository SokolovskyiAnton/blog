<template>
    <div class="container" id="login">
        <div>
            <h2 class="mt-3 text-center">Вход</h2>
            <form @submit.prevent="sendForm" novalidate>
                <div class="form-group">
                  <label for="idEmail">Почтовый ящик</label>
                  <input 
                  @blur="$v.email.$touch()"
                  @click="notExistUser = false"
                   v-model="email"
                   :class="{'is-invalid': $v.email.$error}"
                    type="email" class="form-control" id="idEmail" placeholder="Введите название">
                    <div v-if="!$v.email.required" class="invalid-feedback">
                        Поле должно быть заполнено.
                    </div>
                    <div v-if="!$v.email.email" class="invalid-feedback">
                        Поле должно быть email адресом.
                    </div>
                    <div v-if="notExistUser" style="width: 100%;margin-top: 0.25rem;font-size: 80%;color: #dc3545;">
                        Такого пользователя не существует.
                    </div>
                </div>
                <div class="form-group">
                  <label for="idPassword">Пароль</label>
                  <input 
                  @blur="$v.password.$touch()"
                  @click="wrongPassword = false"
                   v-model="password"
                   :class="{'is-invalid': $v.password.$error}"
                    type="password" class="form-control" id="idPassword" placeholder="Пароль">
                <div v-if="!$v.password.required" class="invalid-feedback">
                    Поле должно быть заполнено.
                </div>
                <div v-if="!$v.password.minLength" class="invalid-feedback">
                    Не меньше 6 символов.
                </div>
                <div v-if="wrongPassword" style="width: 100%;margin-top: 0.25rem;font-size: 80%;color: #dc3545;">
                    Неправильный пароль.
                </div>
                </div>
                <button style="width: 150px;" type="submit" class="btn btn-primary">Войти</button>
                <p class="mt-3">Вы не зарегистрированы ? <router-link to="/register">Нажмите сюда</router-link> </p>
            </form>
        </div>

    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            wrongPassword: false,
            notExistUser: false
        }
    },
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)}
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
    },
    computed: {
        error() {
            return this.$store.getters.error 
        }
    },
    watch: {
        error(fbError) {
            if (fbError.code = 'auth/wrong-password') {
                console.log(fbError);
                this.wrongPassword = true
            }
            if (fbError.code = 'auth/user-not-found') {
                this.notExistUser = true
            }
        }
    }

}
</script>

<style scoped>

</style>