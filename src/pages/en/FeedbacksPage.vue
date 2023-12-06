<template>
  <q-page padding>

    <p class="text-h5">
      Feedback
    </p>
    <p>When clicking on the arrow, the suggested steps are displayed.</p>

    <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 100%"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="simple"
            node-key="label"
            selected-color="primary"
            v-model:selected="selected"
            no-connectors
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Written delivery with individual feedback">
            <div class="text-h4 q-mb-md">Written delivery with individual feedback</div>
            <p>Students submit a written assignment, and the teacher provides individual feedback, also in writing.</p>
          </q-tab-panel>

          <q-tab-panel name="Written submission with collective feedback">
            <div class="text-h4 q-mb-md">Written submission with collective feedback</div>
            <p> Students submit a written assignment.</p>
            <p>Feedback can be provided collectively, presenting the correct solution model or using students' own models to illustrate errors and successes.</p>
          </q-tab-panel>

          <q-tab-panel name="Seminar presentations">
            <div class="text-h4 q-mb-md">Seminar presentations</div>
            <p>Requesting students to present their models through seminars.</p>
            <p>After the seminar presentations, the professor provides feedback to the students regarding what was presented.</p>
          </q-tab-panel>

        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'FeedbacksPage',

  setup () {
    return {
      splitterModel: ref(30),
      selected: ref('Written delivery with individual feedback'),

      simple: [
        {
          label: 'Written delivery with individual feedback',
          children: [
            {
              label: '- Students submit their work in writing',
              disabled: true
            },
            {
              label: '- The professor provides individual written feedback',
              disabled: true
            }
          ]
        },
        {
          label: 'Written submission with collective feedback',
          children: [
            {
              label: '- Students submit their work in writing',
              disabled: true
            },
            {
              label: '- The professor provides an example solution as collective feedback',
              disabled: true
            }
          ]
        },
        {
          label: 'Seminar presentations',
          children: [
            {
              label: '- Students conduct seminar presentations',
              disabled: true
            },
            {
              label: '- The professor provides feedback on the presentations',
              disabled: true
            }
          ]
        }
      ]
    }
  }

})
</script>
