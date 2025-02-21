<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <div class="text-h6 q-mb-md">Repositório de Exemplos</div>

      <!-- Filtros e Ordenação -->
      <div class="row q-col-gutter-md">
        <!-- Filtro por Tipo -->
        <div class="col-12 col-md-4">
          <q-select
            v-model="filtroTipo"
            :options="tiposExemplo"
            label="Filtrar por Tipo"
            multiple
            use-chips
            clearable
            dense
            outlined
          />
        </div>

        <!-- Filtro por Modelos UML -->
        <div class="col-12 col-md-4">
          <q-select
            v-model="filtroModelo"
            :options="modelosUML"
            label="Filtrar por Modelos UML"
            multiple
            use-chips
            clearable
            dense
            outlined
          />
        </div>

        <!-- Ordenação -->
        <div class="col-12 col-md-4">
          <q-select
            v-model="criterioOrdenacao"
            :options="opcoesOrdenacao"
            label="Ordenar por"
            dense
            outlined
            @update:model-value="ordenarExemplos"
          />
        </div>
      </div>

      <!-- Tabela de Exemplos -->
      <q-table
        v-if="!loading"
        :rows="exemplosFiltrados"
        :columns="colunas"
        row-key="id"
        v-model:pagination="paginacao"
        :rows-per-page-options="[5, 10, 20]"
        grid
        hide-bottom
      >
        <template v-slot:item="props">
          <q-card
            class="q-ma-sm q-pa-xs example-card cursor-pointer"
            @click="abrirDetalhes(props.row.id)"
            flat
            bordered
            style="width: 100%"
          >
            <q-card-section>
              <div class="text-h6">{{ props.row.titulo }}</div>
              <div class="text-caption text-grey">{{ props.row.tipo }}</div>
              <div class="text-caption text-primary">
                <strong>Modelos:</strong> {{ props.row.modelo.join(', ') }}
              </div>
              <div class="row items-center">
                <q-rating v-model="props.row.avaliacaoMedia" size="1.5em" color="amber" readonly />
                <span class="q-ml-sm text-weight-bold">{{ props.row.avaliacaoMedia || '0.0' }}</span>
                <span class="q-ml-xs text-grey">({{ props.row.totalAvaliacoes }} avaliações)</span>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </q-table>

      <div v-else class="q-mt-md text-center">
        <q-spinner size="40px" color="primary" />
        <p>Carregando exemplos...</p>
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
import { carregarExemplos } from '../../firebase/firebase-repositorio'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $q = useQuasar()
    const exemplos = ref([])
    const loading = ref(true)
    const filtroTipo = ref([])
    const filtroModelo = ref([])
    const paginacao = ref({ page: 1, rowsPerPage: 5 })
    const criterioOrdenacao = ref({ label: 'Data de Inclusão (Mais Recente)', value: 'dataDesc' })
    const router = useRouter()
    const opcoesOrdenacao = [
      { label: 'Data de Inclusão (Mais Recente)', value: 'dataDesc' },
      { label: 'Data de Inclusão (Mais Antiga)', value: 'dataAsc' },
      { label: 'Avaliação (Maior para Menor)', value: 'avaliacaoDesc' },
      { label: 'Avaliação (Menor para Maior)', value: 'avaliacaoAsc' }
    ]
    const colunas = [
      { name: 'titulo', label: 'Título', field: 'titulo', align: 'left', sortable: true },
      { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left', sortable: true },
      { name: 'modelo', label: 'Modelos UML', field: 'modelo', align: 'left', sortable: false },
      { name: 'avaliacaoMedia', label: 'Avaliação', field: 'avaliacaoMedia', align: 'left', sortable: true }
    ]

    const tiposExemplo = ['Exemplo Correto', 'Exemplo Errôneo', 'Ambos']
    const modelosUML = [
      'Diagrama de Classes', 'Diagrama de Objetos', 'Diagrama de Componentes', 'Diagrama de Pacotes',
      'Diagrama de Estrutura Composta', 'Diagrama de Implantação (Deployment)',
      'Diagrama de Caso de Uso', 'Diagrama de Sequência', 'Diagrama de Comunicação',
      'Diagrama de Estados (State Machine)', 'Diagrama de Atividades', 'Diagrama de Interação Geral',
      'Diagrama de Tempo'
    ]

    const carregarLista = async () => {
      loading.value = true
      try {
        const resultado = await carregarExemplos()
        exemplos.value = resultado.map(exemplo => ({
          ...exemplo,
          avaliacaoMedia: calcularMedia(exemplo.ratings),
          totalAvaliacoes: exemplo.ratings.length
        }))
        ordenarExemplos()
      } catch (error) {
        console.error(error)
        exemplos.value = []
        $q.notify({ message: 'Erro ao carregar exemplos.', color: 'negative' })
      } finally {
        loading.value = false
      }
    }

    const exemplosFiltrados = computed(() => {
      let lista = [...exemplos.value]

      if (filtroTipo.value.length) {
        lista = lista.filter(exemplo => filtroTipo.value.includes(exemplo.tipo))
      }

      if (filtroModelo.value.length) {
        lista = lista.filter(exemplo => exemplo.modelo.some(m => filtroModelo.value.includes(m)))
      }

      return lista
    })

    const totalPaginas = computed(() => Math.ceil(exemplosFiltrados.value.length / paginacao.value.rowsPerPage))

    const atualizarPagina = (novaPagina) => {
      paginacao.value.page = novaPagina
    }

    const ordenarExemplos = () => {
      exemplos.value.sort((a, b) => {
        if (criterioOrdenacao.value.value === 'avaliacaoDesc') return b.avaliacaoMedia - a.avaliacaoMedia
        if (criterioOrdenacao.value.value === 'avaliacaoAsc') return a.avaliacaoMedia - b.avaliacaoMedia
        if (criterioOrdenacao.value.value === 'dataDesc') return new Date(b.lastUpdated) - new Date(a.lastUpdated)
        if (criterioOrdenacao.value.value === 'dataAsc') return new Date(a.lastUpdated) - new Date(b.lastUpdated)
        return 0
      })
    }

    const calcularMedia = (ratings) => {
      if (!ratings || ratings.length === 0) return 0

      const soma = ratings.reduce((total, r) => {
        const estrelas = Number(r.rating) || 0 // 🔹 Converte para número, se for inválido usa 0
        return total + estrelas
      }, 0)

      const media = soma / ratings.length
      return isNaN(media) ? 0 : media.toFixed(1) // 🔹 Evita NaN e formata com 1 casa decimal
    }

    const abrirDetalhes = (exemploId) => {
      router.push({ name: 'exampleDetails', query: { id: exemploId } })
    }

    onMounted(carregarLista)

    return {
      exemplosFiltrados,
      colunas,
      paginacao,
      totalPaginas,
      loading,
      filtroTipo,
      filtroModelo,
      tiposExemplo,
      modelosUML,
      criterioOrdenacao,
      atualizarPagina,
      ordenarExemplos,
      opcoesOrdenacao,
      abrirDetalhes
    }
  }
}
</script>

<style>
.example-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border-radius: 8px;
}
.example-card:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
}
</style>
