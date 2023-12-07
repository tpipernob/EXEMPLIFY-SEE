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
        ><span class="ellipsis">Examples Repository</span></q-toolbar-title>
      </q-ribbon>
    </q-toolbar>
    <q-card-section class="q-pb-sm">
      <code-tabs :tagParts="tagParts"></code-tabs>
    </q-card-section>
    <q-card-section>
      <q-grid :data="data" :columns="columns" :columns_filter="false" :draggable="true" :fullscreen="true" :csv_download="false" :global_search="true" :groupby_filter="false" :header_filter="true" >
        <template v-slot:body="props" >
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
          label: 'Type',
          field: 'exampleType',
          sortable: true,
          filter_type: 'text'
        },
        {
          name: 'model',
          align: 'left',
          label: 'Model',
          field: 'model',
          sortable: true
        },
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
        { name: 'additionalInformation', align: 'left', label: 'Additional Information', field: 'additionalInformation' },
        { name: 'link', align: 'left', label: 'Link', field: 'link' }
      ],
      data: [
        {
          name: 'Faculty',
          exampleType: 'Erroneous Example',
          model: 'Use Case Diagram',
          additionalInformation: '21 Examples of Anti-patterns',
          link: 'https://faculty.kfupm.edu.sa/ICS/melattar/UCAntipatterns.htm'

        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: '31 Examples of Anti-patterns with Diagrams',
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: '6 Textual Examples',
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MTFhOGY2ZDBhMGY4MGZhMg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Correct Example',
          model: 'Class Diagram',
          additionalInformation: '6 Textual Examples',
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MzgxZjY3MzczOGE5NWNmNg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Domain Example',
          model: 'Not specified',
          additionalInformation: '9 Examples of Domains That Can Be Used for Modeling',
          link: 'https://sites.google.com/site/activelearningmethods/escolha-aqui-seu-cenario'
        },
        {
          name: 'Article',
          exampleType: 'Correct and Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: 'Content in Appendix 1: Some Common Quality Issues and Corresponding Positive and Negative Examples',
          link: 'https://link.springer.com/chapter/10.1007/978-1-4419-7355-9_8'
        },
        {
          name: 'Steam',
          exampleType: 'Erroneous Example',
          model: 'Use Case Diagram',
          additionalInformation: 'Complete analysis of use case models of four real-world systems',
          link: 'http://www.steam.ualberta.ca/main/research_areas/AntiPatterns.htm'
        },
        {
          name: 'Evaluating the layout quality of UML class diagrams using machine learning',
          exampleType: 'Correct Example',
          model: 'Class Diagram',
          additionalInformation: 'A set of 609 labeled UML class diagrams.',
          link: 'https://zenodo.org/record/5037744#.Y3Y-eOzMLjh'
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
