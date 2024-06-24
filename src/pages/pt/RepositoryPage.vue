<template>
  <q-card :class="!$q.dark.isActive ? 'my-lg q-pa-md q-ma-sm bg-grey-2' : 'my-lg q-pa-md q-ma-sm bg-grey-8'">
    <q-toolbar>
      <q-ribbon position="left" color="rgba(0,0,0,.58)" background-color="#c0c0c0" leaf-color="#a0a0a0"
        leaf-position="bottom" decoration="rounded-out">
        <q-toolbar-title class="example-title" style="padding: 5px 20px;"><span class="ellipsis">Repositório de
            Exemplos</span></q-toolbar-title>
      </q-ribbon>
    </q-toolbar>
    <q-card-section class="q-pb-sm">
      <code-tabs :tagParts="tagParts"></code-tabs>
    </q-card-section>
    <q-card-section>
      <q-grid :data="data" :columns="columns" :columns_filter="false" :draggable="true" :fullscreen="true"
        :csv_download="false" :global_search="true" :groupby_filter="false" :header_filter="true">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="exampleType">
              {{ props.row.exampleType }}
            </q-td>
            <q-td key="model">
              {{ props.row.model }}
            </q-td>
            <q-td key="name" style="white-space: pre-wrap;">
              {{ props.row.name }}
            </q-td>
            <q-td key="additionalInformation" style="white-space: pre-wrap;">
              {{ props.row.additionalInformation }}
            </q-td>
            <q-td key="review">
              <StarRating :key="props.row.info" :docIdprop="props.row.info" :reviewIdprop="reviewId" />
            </q-td>
            <q-td key="link">
              <q-btn flat label="" :href="props.row.link" target="_blank" icon="link" />
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </q-card-section>
  </q-card>
</template>

<script>
import StarRating from '../../components/StarRating.vue'

export default {

  data() {
    return {
      reviewId: '',

      columns: [
        {
          name: 'exampleType',
          align: 'left',
          label: 'Tipo',
          field: 'exampleType',
          sortable: true,
          filter_type: 'text'
        },
        { name: 'model', align: 'left', label: 'Modelo', field: 'model', sortable: true },
        {
          name: 'name',
          required: true,
          label: 'Local',
          align: 'left',
          field: 'name',
          sortable: true,
          style: 'width: 10%',
          headerStyle: 'width: 0px'
        },
        { name: 'additionalInformation', align: 'left', label: 'Informação adicinoal', field: 'additionalInformation' },
        {
          name: 'review',
          label: 'Rating',
          align: 'left',
          field: 'review'
        },
        { name: 'link', align: 'left', label: 'Link', field: 'link' }
      ],
      data: [
        {
          name: 'Faculty',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Caso de Uso',
          additionalInformation: '21 exemplos de antipadrões',
          info: '21 Examples of Anti-patterns',
          review: () => this.getRating('21 Examples of Anti-patterns'),
          link: 'https://faculty.kfupm.edu.sa/ICS/melattar/UCAntipatterns.htm'

        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: '31 exemplos de antipadrões com imagens dos diagramas',
          info: '31 Examples of Anti-patterns with Diagrams',
          review: () => this.getRating('31 Examples of Anti-patterns with Diagrams'),
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: '6 exemplos textuais',
          info: '6 Textual Examples (Erroneous Examples)',
          review: () => this.getRating('6 Textual Examples (Erroneous Examples)'),
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MTFhOGY2ZDBhMGY4MGZhMg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Exemplo Correto',
          model: 'Diagrama de Classes',
          additionalInformation: '6 exemplos textuais',
          info: '6 Textual Examples (Correct Examples)',
          review: () => this.getRating('6 Textual Examples (Correct Examples)'),
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MzgxZjY3MzczOGE5NWNmNg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Exemplo de domínio',
          model: 'Não especificado',
          additionalInformation: '9 exemplos de domínio que podem ser usados para modelagem',
          info: '9 Examples of Domains That Can Be Used for Modeling',
          review: () => this.getRating('9 Examples of Domains That Can Be Used for Modeling'),
          link: 'https://sites.google.com/site/activelearningmethods/escolha-aqui-seu-cenario'
        },
        {
          name: 'Artigo',
          exampleType: 'Exemplo Correto e Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: 'Conteúdo no apêndice 1: Alguns problemas comuns de qualidade e exemplos positivos e negativos correspondentes',
          info: 'Contents in Appendix 1: Some common quality problems and corresponding positive and negative examples',
          review: () => this.getRating('Contents in Appendix 1: Some common quality problems and corresponding positive and negative examples'),
          link: 'https://link.springer.com/chapter/10.1007/978-1-4419-7355-9_8'
        },
        {
          name: 'Steam',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Caso de Uso',
          additionalInformation: 'Análise completa dos modelos de caso de uso de quatro sistemas do mundo real',
          info: 'Complete analysis of use case models of four real-world systems',
          review: () => this.getRating('Complete analysis of use case models of four real-world systems'),
          link: 'http://www.steam.ualberta.ca/main/research_areas/AntiPatterns.htm'
        },
        {
          name: 'Evaluating the layout quality of UML class diagrams using machine learning',
          exampleType: 'Exemplo Correto',
          model: 'Diagrama de Classes',
          additionalInformation: 'Um conjunto de 609 diagramas de classe UML rotulados.',
          info: 'A set of 609 labeled UML class diagrams.',
          review: () => this.getRating('A set of 609 labeled UML class diagrams.'),
          link: 'https://zenodo.org/record/5037744#.Y3Y-eOzMLjh'
        }
      ]
    }
  },
  created() {
    const storedString = localStorage.getItem('user')
    if (storedString) {
      const validJsonString = storedString.replace('__q_objt|', '')
      try {
        const storedObject = JSON.parse(validJsonString)
        const uid = storedObject.uid
        this.reviewId = uid
      } catch (e) {
        console.error('Parsing error:', e)
      }
    }
  },
  components: {
    StarRating
  },
  props: {
    tagParts: {
      type: Object,
      default: () => {
      }
    }
  }

}
</script>
