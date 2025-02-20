<template>
  <q-page padding>
    <q-card class="q-pa-md q-ma-sm">
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">Galeria de Planos de Aula</div>

        <!-- Barra de Pesquisa -->
        <q-input v-model="filtro" label="Pesquisar plano" dense filled class="q-mb-md" style="max-width: 300px;">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Tabela Grid com Ordenação -->
      <q-table
          v-if="!loading"
          :rows="planosFiltrados"
          :columns="colunas"
          row-key="id"
          v-model:pagination="paginacao"
          :rows-per-page-options="[5, 10, 20]"
          grid
          hide-bottom
          @update:sort="ordenarPlanos"
      >
        <template v-slot:top>
          <div class="row items-center q-gutter-sm">
            <div class="text-subtitle2">Ordenar por:</div>
            <q-btn-toggle
                v-model="criterioOrdenacao"
                push
                toggle-color="primary"
                :options="[
                { label: 'Nome', value: 'nome' },
                { label: 'Autor', value: 'autor' }
              ]"
                @update:model-value="ordenarPlanos"
            />
          </div>
        </template>

        <template v-slot:item="props">
          <q-card class="q-ma-sm" style="width: 100%">
            <q-card-section>
              <div class="text-h6">{{ props.row.nome }}</div>
              <div class="text-caption text-grey">{{ props.row.descricao }}</div>
              <div class="text-caption text-primary"><strong>Autor:</strong> {{ props.row.autor }}</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Carregar Plano" @click="carregarPlanoAula(props.row.id)" />
            </q-card-actions>
          </q-card>
        </template>
      </q-table>

      <div v-else class="q-mt-md text-center">
        <q-spinner size="40px" color="primary" />
        <p>Carregando planos...</p>
      </div>

      <!-- Paginação -->
      <div class="q-mt-md row justify-center">
        <q-pagination
            v-model="paginacao.page"
            :max="totalPaginas"
            :max-pages="5"
            direction-links
            boundary-links
            @update:model-value="atualizarPagina"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { carregarPlanosPublicos, carregarPlano } from '../../firebase/firebase-planos'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const planos = ref([])
    const loading = ref(true)
    const filtro = ref('')
    const criterioOrdenacao = ref('nome')
    const paginacao = ref({ page: 1, rowsPerPage: 5 })

    const colunas = [
      { name: 'nome', label: 'Nome do Plano', field: 'nome', align: 'left', sortable: true },
      { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left', sortable: false },
      { name: 'autor', label: 'Autor', field: 'autor', align: 'left', sortable: true }
    ]

    const carregarPlanos = async () => {
      loading.value = true
      try {
        const resultado = await carregarPlanosPublicos()
        planos.value = resultado || []
        ordenarPlanos() // 🔹 Ordena os planos ao carregar
      } catch (error) {
        console.error(error)
        planos.value = []
        $q.notify({ message: 'Erro ao carregar planos.', color: 'negative' })
      } finally {
        loading.value = false
      }
    }

    const planosFiltrados = computed(() => {
      let lista = [...planos.value]

      if (filtro.value) {
        lista = lista.filter(plano => plano.nome.toLowerCase().includes(filtro.value.toLowerCase())
        )
      }

      return lista
    })

    const totalPaginas = computed(() => Math.ceil(planosFiltrados.value.length / paginacao.value.rowsPerPage))

    const atualizarPagina = (novaPagina) => {
      paginacao.value.page = novaPagina
    }

    const ordenarPlanos = () => {
      planos.value.sort((a, b) => {
        if (a[criterioOrdenacao.value].toLowerCase() < b[criterioOrdenacao.value].toLowerCase()) return -1
        if (a[criterioOrdenacao.value].toLowerCase() > b[criterioOrdenacao.value].toLowerCase()) return 1
        return 0
      })
    }

    const carregarPlanoAula = async (planoId) => {
      try {
        await carregarPlano(planoId)
        router.push({ name: 'tutorial' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Erro ao carregar plano.', color: 'negative', icon: 'error' })
      }
    }

    onMounted(carregarPlanos)

    return {
      planosFiltrados,
      colunas,
      paginacao,
      totalPaginas,
      loading,
      filtro,
      criterioOrdenacao,
      carregarPlanoAula,
      atualizarPagina,
      ordenarPlanos
    }
  }
}
</script>
