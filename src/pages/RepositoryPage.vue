<template>
  <q-card :class="!$q.dark.isActive?'my-lg q-pa-md q-ma-sm bg-grey-2':'my-lg q-pa-md q-ma-sm bg-grey-8'">
    <q-toolbar>
      <q-ribbon
        position="left"
        color="rgba(0,0,0,.58)"
        background-color="#c0c0c0"
        leaf-color="#a0a0a0"
        leaf-position="bottom"
        decoration="rounded-out"
      >
        <q-toolbar-title
          class="example-title"
          style="padding: 5px 20px;"
        ><span class="ellipsis">Selecione o tipo de exemplo</span></q-toolbar-title>
      </q-ribbon>
    </q-toolbar>
    <q-card-section class="q-pb-sm">
      <code-tabs :tagParts="tagParts"></code-tabs>
    </q-card-section>
    <q-card-section>
      <q-grid :data="data" :columns="columns" :columns_filter="false" :draggable="true" :fullscreen="true" :csv_download="false" :global_search="true" :groupby_filter="false" :header_filter="true" >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="exampleType">
              {{ props.row.exampleType }}
            </q-td>
            <q-td key="model">
              {{ props.row.model }}
            </q-td>
            <q-td key="name">
              {{ props.row.name }}
            </q-td>
            <q-td key="additionalInformation">
                {{ props.row.additionalInformation }}
            </q-td>
            <q-td key="link">
              <q-btn
                 flat
                 label = ""
                 :href = "props.row.link"
                 target="_blank"
                 icon="link"
            />
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </q-card-section>
  </q-card>
</template>

<script>

export default {

  data () {
    return {
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
          sortable: true
        },
        { name: 'additionalInformation', align: 'left', label: 'Informação adicinoal', field: 'additionalInformation' },
        { name: 'link', align: 'left', label: 'Link', field: 'link' }
      ],
      data: [
        {
          name: 'Faculty',
          exampleType: 'Exemplo Correto',
          model: 'Diagrama de Caso de Uso',
          additionalInformation: '--',
          link: 'https://faculty.kfupm.edu.sa/ICS/melattar/UCAntipatterns.htm'

        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: 'Generalização de Associação com Fins Inconsistentes',
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml/association-generalization-with-inconsistent-ends'
        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: 'Classe com proprietário obrigatório define outro proprietário',
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml/class-has-multiple-containers-and-at-least-one-is-required'
        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: 'O elemento de multiplicidade tem limite superior menor que inferior',
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml/multiplicity-element-has-upper-small-than-lower-bound'
        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Exemplo Errôneo',
          model: 'Diagrama de Classes',
          additionalInformation: 'Atributo com o mesmo nome de um atributo herdado',
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml/classifier-has-attribute-not-redefining-inherited-one-with-same-name'
        }
      ]
    }
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
