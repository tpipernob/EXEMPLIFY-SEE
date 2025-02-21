<template>
  <q-page padding>
    <div class="column">
      <!-- Card Principal -->
      <q-card class="card-box q-mb-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">{{ example?.titulo }}</div>
          <div class="text-subtitle2 text-grey">{{ example?.tipo }}</div>

          <!-- Avaliação (estrelas) -->
          <div class="row items-center q-mt-xs">
            <q-rating v-model="averageRating" size="1.5em" color="amber" readonly />
            <span class="q-ml-sm text-weight-bold">{{ averageRating.toFixed(1) }}</span>
            <span class="q-ml-xs text-grey">({{ totalReviews }} avaliações)</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text-body1">{{ example?.descricao }}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Baixar Exemplo"
            icon="cloud_download"
            :href="example?.link"
            target="_blank"
          />
        </q-card-actions>
      </q-card>

      <!-- Seção de Detalhes do Exemplo -->
      <q-card class="card-box q-mb-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Detalhes do Exemplo</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-list dense>
            <q-item>
              <q-item-section class="text-weight-bold">Tipo do Exemplo</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example?.tipo }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Modelo(s)</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example?.modelo.join(', ') }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Incluído por</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example?.userId }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Fonte</q-item-section>
              <q-item-section>
                <template v-if="isValidUrl(example?.fonte)">
                  <a :href="example?.fonte" target="_blank" class="text-blue">{{ example?.fonte }}</a>
                </template>
                <template v-else>
                  <div class="text-wrap break-all">{{ example?.fonte }}</div>
                </template>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Última Atualização</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ formatarData(example?.lastUpdated) }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Seção de Avaliações -->
      <q-card class="card-box q-mb-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">Avaliações dos Professores</div>
            <q-btn color="primary" label="Adicionar Avaliação" icon="add_comment" @click="abrirDialogo()" />
          </div>
        </q-card-section>

        <q-dialog v-model="reviewDialog">
          <q-card class="card-box" style="max-width: 600px; width: 100%;">
            <q-card-section>
              <div class="text-h6">Adicionar Avaliação</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-rating v-model="newReview.rating" size="2em" color="amber" class="q-mt-md" />
              <q-input v-model="newReview.comment" label="Comentário" type="textarea" class="q-mt-md" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="grey" v-close-popup />
              <q-btn color="primary" label="Enviar" @click="enviarAvaliacao" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="editarDialog">
          <q-card class="card-box" style="max-width: 600px; width: 100%;">
            <q-card-section>
              <div class="text-h6">Editar Avaliação</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-rating v-model="reviewEditando.rating" size="2em" color="amber" class="q-mt-md" />
              <q-input v-model="reviewEditando.comment" label="Comentário" type="textarea" class="q-mt-md" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="grey" v-close-popup />
              <q-btn color="primary" label="Salvar Alterações" @click="salvarEdicao" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-separator />

        <!-- Se não houver avaliações, mostrar mensagem -->
        <q-card-section v-if="reviews.length === 0">
          <div class="text-center text-grey">Ainda não há avaliações para este exemplo.</div>
        </q-card-section>

        <!-- Lista de Avaliações -->
        <q-card-section v-for="review in paginatedReviews" :key="review.id">
          <div class="row items-center justify-between">
            <div>
              <div class="text-weight-bold">{{ review.author }}</div>
              <div class="text-grey text-caption">{{ formatarData(review.date) }}</div>
            </div>
            <q-btn
              v-if="review.userId === auth.currentUser?.uid"
              flat dense icon="edit" color="blue"
              @click="abrirEdicao(review)"
            />
          </div>

          <q-rating v-model="review.rating" size="1.2em" color="amber" readonly class="q-mt-xs" />
          <p class="q-mt-sm">{{ review.comment }}</p>

          <q-separator v-if="review.id !== reviews.length" class="q-mt-md" />
        </q-card-section>

        <!-- Paginação -->
        <q-card-actions align="center">
          <q-pagination v-model="currentPage" :max="totalPages" direction-links color="primary" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { carregarExemploPorId, salvarAvaliacao, editarAvaliacao } from '../../firebase/firebase-repositorio'
import { auth } from '../../firebase/index'
export default {
  setup() {
    const route = useRoute()
    const example = ref(null)
    const reviews = ref([])
    const currentPage = ref(1)
    const itemsPerPage = 5
    const reviewDialog = ref(false)
    const newReview = ref({ author: '', rating: 5, comment: '' })
    const editarDialog = ref(false)
    const reviewEditando = ref({})

    const carregarDetalhes = async () => {
      const exemploId = route.query.id
      if (!exemploId) return

      try {
        const dados = await carregarExemploPorId(exemploId)
        if (dados) {
          example.value = dados
          reviews.value = dados.ratings || []
        }
      } catch (error) {
        console.error('Erro ao carregar exemplo:', error)
      }
    }

    const totalPages = computed(() => Math.ceil(reviews.value.length / itemsPerPage))
    const paginatedReviews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      return reviews.value.slice(start, start + itemsPerPage)
    })

    const averageRating = computed(() => {
      return reviews.value.length
        ? reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length
        : 0
    })

    const isValidUrl = (url) => {
      return url?.startsWith('http://') || url?.startsWith('https://')
    }

    const formatarData = (timestamp) => {
      if (!timestamp) return 'Desconhecido'
      return new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    const enviarAvaliacao = async () => {
      if (!newReview.value.comment) {
        alert('O comentário não pode estar vazio.')
        return
      }

      try {
        const avaliacao = {
          rating: newReview.value.rating,
          comment: newReview.value.comment
        }

        const novaAvaliacao = await salvarAvaliacao(example.value.id, avaliacao)

        reviews.value.unshift(novaAvaliacao) // Atualiza localmente a exibição
        newReview.value = { rating: 5, comment: '' }
        reviewDialog.value = false
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error)
      }
    }

    const salvarEdicao = async () => {
      try {
        await editarAvaliacao(example.value.id, reviewEditando.value)

        // Atualiza localmente a avaliação na lista
        const index = reviews.value.findIndex(r => r.userId === auth.currentUser?.uid)
        if (index !== -1) {
          reviews.value[index] = { ...reviewEditando.value }
        }

        editarDialog.value = false
      } catch (error) {
        console.error('Erro ao editar avaliação:', error)
      }
    }

    const abrirDialogo = () => {
      reviewDialog.value = true
    }

    const totalReviews = computed(() => {
      return reviews.value.length
    })

    const abrirEdicao = (review) => {
      reviewEditando.value = { ...review }
      editarDialog.value = true
    }

    onMounted(carregarDetalhes)

    return {
      example,
      reviews,
      currentPage,
      totalPages,
      paginatedReviews,
      averageRating,
      isValidUrl,
      formatarData,
      reviewDialog,
      enviarAvaliacao,
      abrirDialogo,
      newReview,
      totalReviews,
      abrirEdicao,
      salvarEdicao,
      auth,
      editarDialog,
      reviewEditando
    }
  }
}
</script>
