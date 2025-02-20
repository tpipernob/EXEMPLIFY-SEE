<template>
  <q-page padding>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Galeria de Planos de Aula</div>

      <div v-if="loading" class="q-mt-md text-center">
        <q-spinner size="40px" color="primary" />
        <p>Carregando planos...</p>
      </div>

      <div v-else-if="planos.length === 0" class="q-mt-md text-center">
        <p>Nenhum plano público disponível.</p>
      </div>

      <div v-else class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div v-for="plano in planos" :key="plano.id" class="col-12 col-md-6 col-lg-4">
            <q-card class="q-pa-sm">
              <q-card-section>
                <div class="text-h6">{{ plano.nome }}</div>
                <div class="text-caption text-grey">{{ plano.descricao }}</div>
                <div class="text-caption text-primary"><strong>Autor:</strong> {{ plano.autor }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="Carregar Plano" @click="carregarPlano(plano.id)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { carregarPlanosPublicos, carregarPlano } from '../../firebase/firebase-planos'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const planos = ref([])
    const loading = ref(true)

    const carregarPlanos = async () => {
      try {
        planos.value = await carregarPlanosPublicos()
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Erro ao carregar planos.', color: 'negative' })
      } finally {
        loading.value = false
      }
    }

    // Carregar um plano e redirecionar para TutorialPage (TabOptions.vue)
    const carregarPlanoAula = async (planoId) => {
      try {
        await carregarPlano(planoId) // Chama a função do firebase-planos.js
        router.push({ name: 'tutorial' }) // Redireciona o usuário para a página de edição de planos
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Erro ao carregar plano.', color: 'negative', icon: 'error' })
      }
    }

    onMounted(carregarPlanos)

    return {
      planos,
      loading,
      carregarPlano: carregarPlanoAula
    }
  }
}
</script>
