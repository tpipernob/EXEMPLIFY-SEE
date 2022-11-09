<template>
  <q-page padding>

    <p class="text-h5">
      Feedback
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
          <q-tab-panel name="Entrega por escrito com feedback individual">
            <div class="text-h4 q-mb-md">Entrega por escrito com feedback individual</div>
            <p>Os alunos realizam uma entrega por escrito e o professor envia um feedback individual realizado também por escrito.</p>
          </q-tab-panel>

          <q-tab-panel name="Entrega por escrito com feedback coletivo">
            <div class="text-h4 q-mb-md">Entrega por escrito com feedback coletivo</div>
            <p>Os alunos realizam uma entrega por escrito.</p>
            <p>O feedback pode ser feito de forma coletiva, apresentando a solução correta do modelo ou utilizando os modelos dos próprios alunos para exemplificar os erros e acertos cometidos.</p>
          </q-tab-panel>

          <q-tab-panel name="Apresentação de seminários">
            <div class="text-h4 q-mb-md">Apresentação de seminários</div>
            <p>Solicitar aos alunos que apresentem os seus modelos por meio de seminários.</p>
            <p>Após a apresentação dos seminários, o professor fornece um feedback aos alunos a respeito do que foi apresentado.</p>
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
      selected: ref('Entrega por escrito com feedback individual'),

      simple: [
        {
          label: 'Entrega por escrito com feedback individual',
          children: [
            {
              label: 'Alunos realizam a entrega por escrito',
              disabled: true
            },
            {
              label: 'Professor devolve feedback escrito individual',
              disabled: true
            }
          ]
        },
        {
          label: 'Entrega por escrito com feedback coletivo',
          children: [
            {
              label: 'Alunos realizam a entrega por escrito',
              disabled: true
            },
            {
              label: 'Professor mostra um exemplo de solução',
              disabled: true
            }
          ]
        },
        {
          label: 'Apresentação de seminários',
          children: [
            {
              label: 'Alunos apresentam os seminários',
              disabled: true
            },
            {
              label: 'Professor realiza o feedback das apresentações',
              disabled: true
            }
          ]
        }
      ]
    }
  }

})
</script>
