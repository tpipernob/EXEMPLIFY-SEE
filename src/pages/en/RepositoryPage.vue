<template>
  <q-card :class="!$q.dark.isActive ? 'my-lg q-pa-md q-ma-sm bg-grey-2' : 'my-lg q-pa-md q-ma-sm bg-grey-8'">
    <q-toolbar>
      <q-ribbon position="left" color="rgba(0,0,0,.58)" background-color="#c0c0c0" leaf-color="#a0a0a0"
        leaf-position="bottom" decoration="rounded-out">
        <q-toolbar-title class="example-title" style="padding: 5px 20px;"><span class="ellipsis">Examples
            Repository</span></q-toolbar-title>
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
              <StarRating :key="props.row.additionalInformation" :docIdprop="props.row.additionalInformation"
                :reviewIdprop="reviewId" />
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
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Several UML diagrams of different types, all part of a simple fabricated Online Shopping model',
          info: 'Online Shopping',
          review: () => this.getRating('Online Shopping'),
          link: 'https://www.uml-diagrams.org/examples/online-shopping-example.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Ticket vending machine is a vending machine that sells and produces tickets to commuters',
          info: 'Ticket vending machine',
          review: () => this.getRating('Ticket vending machine'),
          link: 'https://www.uml-diagrams.org/ticket-vending-machine-uml-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Several UML diagrams of different types, all part of a Bank ATM model',
          info: 'Bank ATM UML diagrams',
          review: () => this.getRating('Bank ATM UML diagrams'),
          link: 'https://www.uml-diagrams.org/examples/bank-atm-example.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Several UML diagrams of different types, all part of a Hospital Management model',
          info: 'Hospital Management UML diagrams',
          review: () => this.getRating('Hospital Management UML diagrams'),
          link: 'https://www.uml-diagrams.org/examples/hospital-management-example.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Some examples of UML diagrams related to the Digital Imaging and Communications in Medicine (DICOM) Standard',
          info: 'DICOM UML diagrams',
          review: () => this.getRating('DICOM UML diagrams'),
          link: 'https://www.uml-diagrams.org/dicom-uml-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Several UML diagrams of different types, related to Java™ technology and APIs',
          info: 'Java™ and APIs UML diagrams',
          review: () => this.getRating('Java™ and APIs UML diagrams'),
          link: 'https://www.uml-diagrams.org/examples/java-uml-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Some examples of UML diagrams of different types, all related to Android SDKs and application development',
          info: 'Android SDK UML diagrams',
          review: () => this.getRating('Android SDK UML diagrams'),
          link: 'https://www.uml-diagrams.org/examples/android-uml-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Different Types of UML Diagrams',
          additionalInformation: 'Several examples of UML diagrams with some simplified description of software licensing domain, use cases, process, implementation, and deployment using the SafeNet Sentinel HASP Software Licensing Security Solution',
          info: 'Software licensing domain UML diagrams',
          review: () => this.getRating('Software licensing domain UML diagrams'),
          link: 'https://www.uml-diagrams.org/software-licensing-sentinel-uml-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Activity Diagrams',
          additionalInformation: '8 Activity diagrams',
          info: 'Activity Diagrams',
          review: () => this.getRating('Activity Diagrams'),
          link: 'https://www.uml-diagrams.org/activity-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Class Diagrams',
          additionalInformation: '13 Class diagrams',
          info: 'Class Diagrams',
          review: () => this.getRating('Class Diagrams'),
          link: 'https://www.uml-diagrams.org/activity-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Communication Diagram',
          additionalInformation: 'Communication diagram example',
          info: 'Communication Diagram',
          review: () => this.getRating('Communication Diagram'),
          link: 'https://www.uml-diagrams.org/communication-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Component Diagrams',
          additionalInformation: 'Component diagram examples',
          info: 'Component Diagrams',
          review: () => this.getRating('Component Diagrams'),
          link: 'https://www.uml-diagrams.org/component-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Composite Structure Diagrams',
          additionalInformation: 'Composite structure diagram examples',
          info: 'Composite Structure Diagrams',
          review: () => this.getRating('Composite Structure Diagrams'),
          link: 'https://www.uml-diagrams.org/composite-structure-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Deployment Diagrams',
          additionalInformation: '8 Deployment diagram examples',
          info: 'Deployment Diagrams',
          review: () => this.getRating('Deployment Diagrams'),
          link: 'https://www.uml-diagrams.org/deployment-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Information Flow Diagrams',
          additionalInformation: 'Information flow diagram example',
          info: 'Information Flow Diagrams',
          review: () => this.getRating('Information Flow Diagrams'),
          link: 'https://www.uml-diagrams.org/information-flow-diagrams/scheduled-workflow-example.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Interaction Overview Diagrams',
          additionalInformation: 'Interaction overview diagram examples',
          info: 'Interaction Overview Diagrams',
          review: () => this.getRating('Interaction Overview Diagrams'),
          link: 'https://www.uml-diagrams.org/interaction-overview-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Object Diagram',
          additionalInformation: 'Object diagram example',
          info: 'Object Diagrams',
          review: () => this.getRating('Object Diagrams'),
          link: 'https://www.uml-diagrams.org/online-shopping-user-login-uml-object-diagram-example.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Package Diagrams',
          additionalInformation: 'Package diagram examples',
          info: 'Package Diagrams',
          review: () => this.getRating('Package Diagrams'),
          link: 'https://www.uml-diagrams.org/package-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Profile Diagrams',
          additionalInformation: 'Profile diagram examples',
          info: 'Profile Diagrams',
          review: () => this.getRating('Profile Diagrams'),
          link: 'https://www.uml-diagrams.org/profile-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Sequence Diagrams',
          additionalInformation: 'Sequence diagram examples',
          info: 'Sequence Diagrams',
          review: () => this.getRating('Sequence Diagrams'),
          link: 'https://www.uml-diagrams.org/sequence-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'State Machine Diagrams',
          additionalInformation: 'State machine diagram examples',
          info: 'State Machine Diagrams',
          review: () => this.getRating('State Machine Diagrams'),
          link: 'https://www.uml-diagrams.org/state-machine-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Timing Diagrams',
          additionalInformation: 'Timing diagram examples',
          info: 'Timing Diagrams',
          review: () => this.getRating('Timing Diagrams'),
          link: 'https://www.uml-diagrams.org/timing-diagrams-examples.html'
        },
        {
          name: 'UML Diagrams Examples',
          exampleType: 'Correct Example',
          model: 'Use Case Diagrams',
          additionalInformation: 'Use case diagram examples',
          info: 'Use Case Diagrams',
          review: () => this.getRating('Use Case Diagrams'),
          link: 'https://www.uml-diagrams.org/use-case-diagrams-examples.html'
        },
        {
          name: 'Faculty',
          exampleType: 'Erroneous Example',
          model: 'Use Case Diagram',
          additionalInformation: '21 Examples of Anti-patterns',
          review: () => this.getRating('21 Examples of Anti-patterns'),
          link: 'https://faculty.kfupm.edu.sa/ICS/melattar/UCAntipatterns.htm'

        },
        {
          name: 'Metamodeling Anti-Patterns',
          exampleType: 'Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: '31 Examples of Anti-patterns with Diagrams',
          review: () => this.getRating('31 Examples of Anti-patterns with Diagrams'),
          link: 'https://sites.google.com/site/metamodelingantipatterns/catalog/uml'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: '6 Textual Examples (Erroneous Examples)',
          review: () => this.getRating('6 Textual Examples (Erroneous Examples)'),
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MTFhOGY2ZDBhMGY4MGZhMg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Correct Example',
          model: 'Class Diagram',
          additionalInformation: '6 Textual Examples (Correct Examples)',
          review: () => this.getRating('6 Textual Examples (Correct Examples)'),
          link: 'https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxhY3RpdmVsZWFybmluZ21ldGhvZHN8Z3g6MzgxZjY3MzczOGE5NWNmNg'
        },
        {
          name: 'OpenSMALS',
          exampleType: 'Domain Example',
          model: 'Not specified',
          additionalInformation: '9 Examples of Domains That Can Be Used for Modeling',
          review: () => this.getRating('9 Examples of Domains That Can Be Used for Modeling'),
          link: 'https://sites.google.com/site/activelearningmethods/escolha-aqui-seu-cenario'
        },
        {
          name: 'Article',
          exampleType: 'Correct and Erroneous Example',
          model: 'Class Diagram',
          additionalInformation: 'Contents in Appendix 1: Some common quality problems and corresponding positive and negative examples',
          review: () => this.getRating('Contents in Appendix 1: Some common quality problems and corresponding positive and negative examples'),
          link: 'https://link.springer.com/chapter/10.1007/978-1-4419-7355-9_8'
        },
        {
          name: 'Steam',
          exampleType: 'Erroneous Example',
          model: 'Use Case Diagram',
          additionalInformation: 'Complete analysis of use case models of four real-world systems',
          review: () => this.getRating('Complete analysis of use case models of four real-world systems'),
          link: 'http://www.steam.ualberta.ca/main/research_areas/AntiPatterns.htm'
        },
        {
          name: 'Evaluating the layout quality of UML class diagrams using machine learning',
          exampleType: 'Correct Example',
          model: 'Class Diagram',
          additionalInformation: 'A set of 609 labeled UML class diagrams.',
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
