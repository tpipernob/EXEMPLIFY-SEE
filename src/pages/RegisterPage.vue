<template>

  <q-card class="q-ma-xl">
   <div class="row">
    <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
     <div class="row full-width q-px-xl q-pb-xl full-height flex flex-center">
      <div class="">
       <div class="text-h4 text-uppercase text-white fredoka" style="min-width: 220px">Bem Vindo!</div>
       <div class="text-white q-my-sm text-subtitle1">Insira seus dados!
       </div>
      </div>
     </div>
    </div>

    <div class="col-12 col-sm-7">
     <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
      <div class="col-12 fredoka text-subtitle1">
       <router-link class="text-primary" style="text-decoration: none" to="/">
        APP-EBL
       </router-link>
      </div>
     </div>
     <div class="row q-pa-sm-sm q-pa-md">
      <div class="col-12">
       <q-card-section>
        <div class="q-mb-xl">
         <div class="flex justify-center">
          <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
           Formulário de Registro</div>
         </div>
        </div>

        <q-form ref="form" class="q-gutter-md" @submit="submit">
         <q-input v-model="user.first_name" label="Nome" name="First Name" />
         <q-input v-model="user.last_name" label="Sobrenome" name="Last Name" />
         <q-input v-model="user.email" label="Email" name="Email" />
         <q-input v-model="user.password" label="Senha" name="password" type="password" />

         <div>
          <q-btn class="full-width fredoka" color="primary" label="Registrar-se" rounded
           type="submit"></q-btn>

          <div class="q-mt-lg">
           <div class="q-mt-sm">
           Já tem uma conta?
            <router-link class="text-primary" to="/login">Login</router-link>
           </div>
          </div>
         </div>
        </q-form>
       </q-card-section>
      </div>
     </div>
    </div>
   </div>
  </q-card>
 </template>

<script setup>
import { ref, reactive } from 'vue'

const user = reactive({
  last_name: null,
  first_name: null,
  email: null,
  password: null
})

const form = ref(null)

import register from 'src/firebase/firebase-register'
import { useRouter } from 'vue-router'

const submit = async () => {
  if (form.value.validate() && !!await register(user)) {
    const router = useRouter()
    router.push('/app')
  }
}
</script>
