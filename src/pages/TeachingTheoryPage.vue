<template>
  <q-page padding>

    <p class="text-h5">
      Ensino da teoria
    </p>

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
            default-expand-all

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
              label: 'Palestra',
              disabled: true
            },
            {
              label: 'Explicar exemplos dos conceitos ensinados',
              disabled: true
            }
          ]
        },
        {
          label: 'Sala de aula invertida',
          children: [
            {
              label: 'Compartilhar o material',
              disabled: true
            },
            {
              label: 'Revisão dos conceitos e tira dúvidas',
              disabled: true
            },
            {
              label: 'Explicar exemplos dos conceitos ensinados',
              disabled: true
            }
          ]
        }
      ]
    }
  }

})
</script>
