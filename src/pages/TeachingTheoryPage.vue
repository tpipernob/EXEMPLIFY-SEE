<template>
  <q-page padding>

    <p class="text-h5">
      Ensino da teoria
    </p>
    <p>Ao clicar na seta os passos sugeridos são exibidos.</p>

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
          <q-tab-panel name="Aula Expositiva">
            <div class="text-h4 q-mb-md">Aula Expositiva</div>
            <p>Essa etapa é sugerida para casos em que os alunos ainda não tenham tipo contato com o conteúdo.</p>
            <p>Esse tipo de abordagem se mostrou efetiva quando utilizada como ponto inicial do processo de ensino</p>
            <p>A última etapa do processo consiste na utilização de exemplos para ajudar os alunos a relacionar o conteúdo com uma situação concreta.</p>
          </q-tab-panel>

          <q-tab-panel name="Sala de aula invertida">
            <div class="text-h4 q-mb-md">Sala de aula invertida</div>
            <p>Essa etapa é sugerida para casos em que os alunos ainda não tenham tipo contato com o conteúdo.</p>
            <p>A utilização da Sala de Aula Invertida consiste em transpor a exposição do conteúdo para antes do período da aula por meio de vídeos, artigos ou livros. Isso contribui para tornar a absorção de conteúdo mais eficaz e envolvente.</p>
            <p>A última etapa do processo consiste na utilização de exemplos para ajudar os alunos a relacionar o conteúdo com uma situação concreta.</p>
            <p>Para mais informações a respeito deste método de ensino, acessar as referências a seguir:</p>
            <ul>
              <li><a href="https://www.jite.org/documents/Vol17/JITEv17IIPp181-200Joy4734.pdf" target="_blank" rel="noopener noreferrer">Activity Oriented Teaching Strategy for Software Engineering Course: An Experience Report</a></li>
              <li><a href="https://omerad.msu.edu/teaching/teaching-skills-strategies/27-teaching/162-what-why-and-how-to-implement-a-flipped-classroom-model" target="_blank" rel="noopener noreferrer">What, why, and how to implement a flipped classroom model</a></li>
            </ul>
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
      selected: ref('Aula Expositiva'),

      simple: [
        {
          label: 'Aula Expositiva',
          children: [
            {
              label: '- Palestra',
              disabled: true
            },
            {
              label: '- Explicar exemplos dos conceitos ensinados',
              disabled: true
            }
          ]
        },
        {
          label: 'Sala de aula invertida',
          children: [
            {
              label: '- Compartilhar o material',
              disabled: true
            },
            {
              label: '- Revisão dos conceitos e tira dúvidas',
              disabled: true
            },
            {
              label: '- Explicar exemplos dos conceitos ensinados',
              disabled: true

            }
          ]
        },
        {
          label: 'Outras metodologias'

        }
      ]
    }
  }

})
</script>
