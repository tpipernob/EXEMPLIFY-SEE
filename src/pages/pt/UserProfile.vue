<template>
  <q-page padding>
    <q-card class="q-pa-md q-ma-sm">
      <div class="text-h6">Editar Perfil</div>

      <!-- Exibir loading enquanto os dados não carregam -->
      <div v-if="loading" class="q-mt-md text-center">
        <q-spinner size="40px" color="primary" />
        <p>Carregando perfil...</p>
      </div>

      <!-- Formulário -->
      <div v-else class="q-mt-md">
        <q-form @submit.prevent="updateProfile">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="name" label="Nome" outlined dense />
            </div>
            <div class="col-12">
              <q-input v-model="email" label="E-mail" outlined dense disable />
            </div>
            <div class="col-12">
              <q-input v-model="roleLabel" label="Tipo de Usuário" outlined dense disable />
            </div>
          </div>

          <!-- Botão -->
          <div class="q-mt-md q-gutter-sm row">
            <q-btn type="submit" color="primary" icon="save" label="Salvar Alterações" class="col-xs-12 col-sm-auto" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db } from '../../firebase/index.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const name = ref('')
    const email = ref('')
    const role = ref('user') // Padrão: usuário comum
    const roleLabel = ref('Usuário')
    const loading = ref(true) // 🔹 Adicionado estado de carregamento

    const loadUserProfile = async (user) => {
      if (user) {
        email.value = user.email

        const userRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          name.value = userData.name || user.displayName || ''
          role.value = userData.role || 'user'
          roleLabel.value = role.value === 'admin' ? 'Administrador' : 'Usuário'
        } else {
          name.value = user.displayName || 'Usuário'
          role.value = 'user'
          roleLabel.value = 'Usuário'
        }
      }

      loading.value = false // 🔹 Marca como carregado após obter os dados
    }

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          loadUserProfile(user)
        } else {
          loading.value = false // 🔹 Se não houver usuário logado, remove o estado de carregamento
        }
      })
    })

    const updateProfileData = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          throw new Error('Usuário não autenticado.')
        }

        // Atualiza o nome no Firebase Authentication
        await updateProfile(user, { displayName: name.value })

        // Atualiza o nome no Firestore
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, { name: name.value })

        $q.notify({ message: 'Perfil atualizado com sucesso!', color: 'positive' })
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
        $q.notify({ message: 'Erro ao atualizar perfil. Tente novamente.', color: 'negative' })
      }
    }

    return {
      name,
      email,
      roleLabel,
      loading, // 🔹 Agora controlamos o carregamento
      updateProfile: updateProfileData
    }
  }
}
</script>
