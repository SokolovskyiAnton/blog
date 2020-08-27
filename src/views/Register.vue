<template>
    <div class="container" id="login">
        <div>
            <h2 class="mt-3 text-center">Регистрация</h2>
            <form @submit.prevent="register">
                <div class="form-group">
                  <label for="idEmail">Почтовый ящик</label>
                  <input 
                  @blur="$v.email.$touch()"
                  @click="existUser - false"
                   v-model="email"
                   :class="{'is-invalid': $v.email.$error}" 
                   type="email" class="form-control" id="idEmail" placeholder="Введите название">
                   <div v-if="!$v.email.required" class="invalid-feedback">
                        Поле должно быть заполнено.
                    </div>
                    <div v-if="!$v.email.email" class="invalid-feedback">
                        Поле должно быть email адресом.
                    </div>
                    <div v-if="existUser" style="width: 100%;margin-top: 0.25rem;font-size: 80%;color: #dc3545;">
                        Email уже занят.
                    </div>
                </div>
                <div class="form-group">
                  <label for="idPassword">Пароль</label>
                  <input 
                  @blur="$v.password.$touch()"
                   v-model="password"
                   :class="{'is-invalid': $v.password.$error}" 
                   type="password" class="form-control" id="idPassword" placeholder="Пароль">
                   <div v-if="!$v.password.required" class="invalid-feedback">
                    Поле должно быть заполнено.
                   </div>
                   <div v-if="!$v.password.minLength" class="invalid-feedback">
                       Не меньше 6 символов.
                   </div>
                </div>
                <div class="form-group">
                  <label for="idname">Имя</label>
                  <input 
                  @blur="$v.name.$touch()"
                   v-model="name"
                   :class="{'is-invalid': $v.name.$error}" 
                   type="text" class="form-control" id="idname" placeholder="Пароль">
                   <div v-if="!$v.name.required" class="invalid-feedback">
                    Поле должно быть заполнено.
                   </div>
                </div>
                <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                <p class="mt-3">Уже есть аккаунт ? <router-link to="/">Нажмите сюда</router-link> </p>
            </form>
        </div>

    </div>
</template>

<script>
import { required, email, helpers, minLength } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            existUser: false
        }
    },
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)},
        name: {required, alpha}
    },
    methods: {
        async register() {
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }

            try {
                await this.$store.dispatch('register', formData)
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
            if (fbError.code = 'auth/email-already-in-use') {
                this.existUser = true
            }
        }
    }

}
</script>