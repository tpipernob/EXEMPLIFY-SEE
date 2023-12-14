<template>
  <q-page padding>

    <p class="text-h5">
      Teaching Theory
    </p>
    <p>Clicking on the arrow displays the suggested steps.</p>

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
          <q-tab-panel name="Expository Lecture">
            <div class="text-h4 q-mb-md">Expository Lecture</div>
            <p>This step is suggested for cases in which students have not yet had contact with the content.</p>
            <p>This approach has proven effective when used as the initial point in the teaching process.</p>
            <p>The final stage of the process involves using examples to help students relate the content to a concrete situation.</p>
          </q-tab-panel>

          <q-tab-panel name="Flipped Classroom">
            <div class="text-h4 q-mb-md">Flipped Classroom</div>
            <p>This step is suggested for cases in which students have not yet had contact with the content.</p>
            <p>The use of the Flipped Classroom involves moving the content delivery to before the class period through videos, articles, or books. This contributes to making the absorption of content more effective and engaging.</p>
            <p>The final stage of the process involves using examples to help students relate the content to a concrete situation.</p>
            <p>For more information about this teaching method, refer to the following references:</p>
            <ul>
              <li><a href="https://www.jite.org/documents/Vol17/JITEv17IIPp181-200Joy4734.pdf" target="_blank" rel="noopener noreferrer">Activity Oriented Teaching Strategy for Software Engineering Course: An Experience Report</a></li>
              <li><a href="https://omerad.msu.edu/teaching/teaching-skills-strategies/27-teaching/162-what-why-and-how-to-implement-a-flipped-classroom-model" target="_blank" rel="noopener noreferrer">What, why, and how to implement a flipped classroom model</a></li>
            </ul>
          </q-tab-panel>

          <q-tab-panel name="Other methodologies">
            <div class="text-h4 q-mb-md">Other methodologies</div>
            <p>Under construction.</p>
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
  name: 'TeachingTheoryPage',

  setup () {
    return {
      splitterModel: ref(30),
      selected: ref('Expository Lecture'),

      simple: [
        {
          label: 'Expository Lecture',
          children: [
            {
              label: '- Lecture',
              disabled: true
            },
            {
              label: '- Explain examples of the taught concepts.',
              disabled: true
            }
          ]
        },
        {
          label: 'Flipped Classroom',
          children: [
            {
              label: '- Share the material',
              disabled: true
            },
            {
              label: '- Review of concepts and Q&A (Questions and Answers).',
              disabled: true
            },
            {
              label: '- Explain examples of the taught concepts.',
              disabled: true

            }
          ]
        },
        {
          label: 'Other methodologies',
          children: [
            {
              label: '',
              disabled: true
            }
          ]
        }
      ]
    }
  }

})
</script>
