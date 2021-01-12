<template>
    <div>
          <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"><v-icon>person</v-icon>{{userName}}</h3>
            <h3 class="headline mb-0"><v-icon>email</v-icon>{{userEmail}}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
            <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-btn slot="activator" color="primary">Изменить мои данные</v-btn>
      <v-card>
        <v-card-title class="headline">Изменить мои данные? </v-card-title>
        <v-card-text>
            <v-alert :value="getError" type="warning">
                      {{getError}}
                    </v-alert>
            <v-form v-model="valid">
                <v-text-field prepend-icon="person" name="login" label="E-mail" type="email" required v-model="email"></v-text-field>
                 <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password" required v-model="password"></v-text-field>           
                <h3>Я хочу изменить </h3>
                <v-radio-group v-model="changeType">
                <v-radio :label="`Имя`" :value="'name'"></v-radio>
                <v-text-field v-if="changeType == 'name'" prepend-icon="person" name="newname" label="Новое Имя" type="text" required v-model="newname" :rules="nameRules" ></v-text-field>
                <v-radio :label="`Е-майл`" :value="'email'"></v-radio>
                <v-text-field v-if="changeType == 'email'" prepend-icon="email" name="newlogin" label="Новый E-mail" type="email" required v-model="newemail " :rules="emailRules"></v-text-field>
                <v-radio :label="`Пароль`" :value="'password'"></v-radio>
                <v-text-field v-if="changeType == 'password'"  prepend-icon="lock" label=" Новый пароль" name="newpassword" type="password" required v-model="newpassword" :rules="passwordRules"></v-text-field>
    </v-radio-group>
    </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Отменить</v-btn>
          <v-btn color="green darken-1" flat @click.prevent='changeUserData' :disabled="getProcessing || !valid">Изменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import {
         mapGetters
    } from 'vuex'
    export default {
        data(){
            return{
                dialog: false,
                changeType: 'name',
                 email: null,
                password: null,
                newname:null,
                newemail:null,
                newpassword:null,
                valid: false,
                 nameRules:[
                  (v) => !!v|| 'Пожалуйста введите ваше Имя',
                ],     
                 emailRules: [
                  (v) => !!v|| 'Пожалуйста введите EMAIL',
                  (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный E-mail'
                ],
                passwordRules:[
                  (v) => !!v|| 'Пожалуйста введите пароль',
                  (v) => (v && v.length >=6) || 'Пароль должен состоять как минимум из 6 символов'
                ],
            }
        },
                computed:{
            ...mapGetters(['userName','userEmail', 'getProcessing', 'getError'])
        },
        methods:{
            changeUserData(){
                this.$store.dispatch('CHANGE_USER_PROFILE_DATA',{
                email: this.email,
                password: this.password,
                newName: this.newname,
                newEmail: this.newemail,
                newPassword:this.newpassword,
                changeType: this.changeType
                })
                

            }
        }

    }
</script>
<style scoped>
</style>