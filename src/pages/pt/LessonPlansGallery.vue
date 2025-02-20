<template>
  <q-page padding>
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
                <div class="text-caption text-primary"><strong>Autor:</strong> {{ plano.autor || 'Desconhecido' }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="Carregar Plano" @click="carregarPlanoAula(plano.id)" />
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <!-- Paginação Usando QPagination -->
        <div class="q-mt-md row justify-center">
          <q-pagination
            v-model="paginaAtual"
            :max="totalPaginas"
            :max-pages="5"
            :boundary-numbers="true"
            direction-links
            @update:model-value="mudarPagina"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { carregarPlanosPublicos, contarTotalPlanosPublicos, carregarPlano } from '../../firebase/firebase-planos'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const planos = ref([])
    const loading = ref(true)
    const ultimoDocs = ref([]) // 🔹 Agora armazenamos cada página separadamente
    const paginaAtual = ref(1)
    const totalPaginas = ref(1)
    const pageSize = 6

    const carregarPlanos = async (pagina) => {
      loading.value = true
      try {
        // Buscar total de planos para calcular número total de páginas
        if (paginaAtual.value === 1) {
          const totalPlanos = await contarTotalPlanosPublicos()
          totalPaginas.value = Math.ceil(totalPlanos / pageSize)
        }

        // Definir o cursor correto para a página atual
        const ultimoDoc = pagina > 1 ? ultimoDocs.value[pagina - 2] : null
        const resultado = await carregarPlanosPublicos(ultimoDoc, pageSize)

        planos.value = resultado.planos.map(plano => ({
          ...plano,
          autor: plano.autor || 'Desconhecido' // 🔹 Se o autor não estiver salvo, exibir "Desconhecido"
        }))

        // 🔹 Atualiza os cursores armazenados para cada página
        if (resultado.ultimoDoc) {
          ultimoDocs.value[pagina - 1] = resultado.ultimoDoc
        }
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Erro ao carregar planos.', color: 'negative' })
      } finally {
        loading.value = false
      }
    }

    // Mudança de página via QPagination
    const mudarPagina = async (novaPagina) => {
      if (novaPagina !== paginaAtual.value) {
        paginaAtual.value = novaPagina
        await carregarPlanos(novaPagina)
      }
    }

    // Carregar um plano e redirecionar para TutorialPage
    const carregarPlanoAula = async (planoId) => {
      try {
        await carregarPlano(planoId)
        router.push({ name: 'tutorial' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Erro ao carregar plano.', color: 'negative', icon: 'error' })
      }
    }

    onMounted(() => carregarPlanos(1))

    return {
      planos,
      loading,
      carregarPlano: carregarPlanoAula,
      mudarPagina,
      paginaAtual,
      totalPaginas
    }
  }
}
</script>
