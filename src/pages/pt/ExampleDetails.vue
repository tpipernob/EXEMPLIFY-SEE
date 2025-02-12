<template>
  <q-page padding>
    <div class="column">
      <!-- Card Principal -->
      <q-card class="card-box q-mb-md" style="max-width: 900px; width: 100%;">

        <q-card-section>
          <div class="text-h6">{{ example.title }}</div>
          <div class="text-subtitle2 text-grey">{{ example.category }}</div>

          <!-- Avaliação (estrelas) -->
          <div class="row items-center q-mt-xs">
            <q-rating v-model="averageRating" size="1.5em" color="amber" readonly />
            <span class="q-ml-sm text-weight-bold">{{ averageRating.toFixed(1) }}</span>
            <span class="q-ml-xs text-grey">({{ reviews.length }} avaliações)</span>
          </div>

          <!-- Quantidade de downloads -->
<!--          <div class="row items-center q-mt-xs">-->
<!--            <q-icon name="cloud_download" color="blue" size="1.2em" />-->
<!--            <span class="q-ml-xs text-grey">{{ example.downloads }} downloads</span>-->
<!--          </div>-->
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text-body1">{{ example.description }}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Baixar Exemplo"
            icon="cloud_download"
            :href="example.download"
            target="_blank"
          />
        </q-card-actions>
      </q-card>

      <div class="q-mt-md"></div> <!-- Espaçamento entre os cards -->

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
                <div class="text-wrap break-all">{{ example.exampleType }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Modelo(s)</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example.model }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Incluído por</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example.uploader }}</div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Fonte</q-item-section>
              <q-item-section>
                <template v-if="isValidUrl(example.source)">
                  <a :href="example.source" target="_blank" class="text-blue">{{ example.source }}</a>
                </template>
                <template v-else>
                  <div class="text-wrap break-all">{{ example.source }}</div>
                </template>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-weight-bold">Última Atualização</q-item-section>
              <q-item-section>
                <div class="text-wrap break-all">{{ example.lastUpdated }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <div class="q-mt-md"></div> <!-- Espaçamento entre os cards -->

      <!-- Seção de Avaliações -->
      <q-card class="card-box q-mb-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">Avaliações dos Professores</div>
            <q-btn color="primary" label="Adicionar Avaliação" icon="add_comment" @click="reviewDialog = true" />
          </div>
        </q-card-section>

        <q-separator />

        <!-- Lista de Avaliações -->
        <q-card-section v-for="review in paginatedReviews" :key="review.id">
          <div class="row items-center">
            <div class="">
              <div class="text-weight-bold">{{ review.name }}</div>
              <div class="text-grey text-caption">{{ review.date }}</div>
            </div>
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

    <!-- Diálogo para adicionar avaliação -->
    <q-dialog v-model="reviewDialog">
      <q-card class="card-box" style="max-width: 600px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Adicionar Avaliação</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-input v-model="newReview.name" label="Seu Nome" />
          <q-rating v-model="newReview.rating" size="2em" color="amber" class="q-mt-md" />
          <q-input v-model="newReview.comment" label="Comentário" type="textarea" class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn color="primary" label="Enviar" @click="submitReview" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'ExampleDetails',
  setup() {
    const example = ref({
      title: 'Modelo de caixa eletrônico bancário',
      category: 'Exemplo correto',
      description: 'Descreve o funcionamento de um sistema de caixa eletrônico (ATM) de banco por meio de diferentes tipos de diagramas da Linguagem de Modelagem Unificada (UML). O objetivo é fornecer uma visão abrangente do sistema, detalhando tanto a estrutura quanto o comportamento do ATM.',
      exampleType: 'Exemplo correto',
      model: 'Diagrama de Classe - Diagrama de Caso de Uso - Diagrama de Estrutura Composta - Diagrama de Máquina de Estados',
      uploader: 'Prof. João Silva',
      source: 'https://www.uml-diagrams.org/examples/bank-atm-example.html#google_vignette',
      lastUpdated: '10 de Fevereiro de 2025',
      license: 'MIT',
      download: 'https://drive.google.com/drive/folders/1W6LwqT1_rX-5IuFgHi9wQ1c2jNQWe1M5?usp=drive_link'
    })

    const reviews = ref([
      { id: 1, name: 'Prof. Maria Andrade', avatar: '/img/avatar1.png', date: '2024-07-04', rating: 5, comment: 'Ótimo exemplo! Muito útil.' },
      { id: 2, name: 'Prof. Carlos Mendes', avatar: '/img/avatar2.png', date: '2024-06-20', rating: 4, comment: 'Gostei bastante, mas poderia ter mais detalhes no modelo UML.' },
      { id: 3, name: 'Prof. Ana Oliveira', avatar: '/img/avatar3.png', date: '2024-05-10', rating: 3, comment: 'Achei básico para os meus alunos.' },
      { id: 4, name: 'Prof. João Souza', avatar: '/img/avatar4.png', date: '2024-04-15', rating: 5, comment: 'Exemplo muito bem estruturado!' },
      { id: 5, name: 'Prof. Beatriz Santos', avatar: '/img/avatar5.png', date: '2024-03-30', rating: 4, comment: 'Bom, mas poderia ter mais detalhes técnicos.' },
      { id: 6, name: 'Prof. Ricardo Lima', avatar: '/img/avatar6.png', date: '2024-02-18', rating: 2, comment: 'Precisa de melhorias nos exemplos.' },
      { id: 7, name: 'Prof. Tatiana Melo', avatar: '/img/avatar7.png', date: '2024-01-25', rating: 5, comment: 'Excelente para ensino prático!' },
      { id: 8, name: 'Prof. Eduardo Pereira', avatar: '/img/avatar8.png', date: '2023-12-10', rating: 3, comment: 'Razoável, mas poderia ter mais exemplos.' },
      { id: 9, name: 'Prof. Lara Ferreira', avatar: '/img/avatar9.png', date: '2023-11-05', rating: 4, comment: 'Gostei bastante, recomendo!' },
      { id: 10, name: 'Prof. André Costa', avatar: '/img/avatar10.png', date: '2023-10-20', rating: 5, comment: 'O melhor exemplo que já usei!' }
    ])

    const currentPage = ref(1)
    const itemsPerPage = 5

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

    const reviewDialog = ref(false)
    const newReview = ref({ name: '', rating: 5, comment: '' })

    const submitReview = () => {
      if (newReview.value.name && newReview.value.comment) {
        reviews.value.unshift({
          id: reviews.value.length + 1,
          ...newReview.value,
          avatar: '/img/default-avatar.png',
          date: new Date().toISOString().split('T')[0]
        })
        reviewDialog.value = false
        newReview.value = { name: '', rating: 5, comment: '' }
      }
    }

    const isValidUrl = (url) => {
      return url.startsWith('http://') || url.startsWith('https://')
    }

    return { example, reviews, currentPage, totalPages, paginatedReviews, averageRating, reviewDialog, newReview, submitReview, isValidUrl }
  }
})
</script>
