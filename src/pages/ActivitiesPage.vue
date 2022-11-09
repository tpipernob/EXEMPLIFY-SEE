<template>
  <q-page padding>

    <p class="text-h5">
      Atividades
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
          <q-tab-panel name="Exemplo correto aluno iniciante">
            <div class="text-h4 q-mb-md">Exemplo correto aluno iniciante</div>
            <p>Aluno iniciante é aquele que ainda não realizou exercícios sobre o conteúdo.</p>
            <p>No caso de alunos iniciantes, é sugerido uma abordagem que se inicia com o professor demonstrando a construção do modelo. </p>
            <p>Após essa etapa, o professor apresenta aos alunos um domínio e solicita que os alunos realizem a construção do modelo para o domínio apresentado. </p>
            <p>Depois da modelagem realizada pelos alunos, o professor apresenta como seria a modelagem correta e solicita que os alunos façam a correção dos seus próprios modelos. Após a correção dos modelos, os alunos enviam para o professor o resultado.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de sugeridos</p>
          </q-tab-panel>

          <q-tab-panel name="Exemplo correto aluno intermediario">
            <div class="text-h4 q-mb-md">Exemplo correto aluno intermediario</div>
            <p>O aluno intermediário é aquele que já realizou algum tipo de exercício que aborde o conteúdo a ser explorado.</p>
            <p>O professor começa ensinando aos alunos exemplos positivos do modelo escolhido.</p>
            <p>Em seguida, o professor apresenta um domínio para que os alunos possam construir um modelo de acordo com os padrões apresentados.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de sugeridos.</p>
          </q-tab-panel>

          <q-tab-panel name="Exemplo errôneo aluno iniciante (domínio)">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno iniciante (domínio)</div>
            <p>Aluno iniciante é aquele que ainda não realizou exercícios sobre o conteúdo.</p>
            <p>O professor inicia apresentando um domínio para que os alunos realizem a modelagem.</p>
            <p>Depois da modelagem realizada pelos alunos, o professor apresenta alguns anti-padrões e como é possível solucioná-los.</p>
            <p>O próximo passo será a correção dos modelos construídos. Para isso, o professor pode optar por disponibilizar um artefato que auxilie os alunos nessa etapa. Esse artefato pode ser um checklist com os anti-padrões ensinados ou um artefato de inspeção.</p>
            <p>Em relação à correção dos diagramas, o professor pode escolher entre o aluno corrigir o seu próprio diagrama ou fazer com que ele corrija o diagrama de um outro colega.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de sugeridos.</p>
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
  name: 'ActivitiesPage',

  setup () {
    return {
      splitterModel: ref(30),
      selected: ref('Exemplo correto aluno intermediario'),

      simple: [
        {
          label: 'Exemplo correto aluno iniciante',
          children: [
            {
              label: 'Escolher o exemplo',
              disabled: true
            },
            {
              label: 'Professor realiza a demonstração',
              disabled: true
            },
            {
              label: 'Apresentar um domínio',
              disabled: true
            },
            {
              label: 'Alunos realizam a modelagem',
              disabled: true
            },
            {
              label: 'Professor realiza a demonstração',
              disabled: true
            },
            {
              label: 'Alunos corrigem o modelo',
              disabled: true
            },
            {
              label: 'Feedback',
              disabled: true
            }
          ]
        },
        {
          label: 'Exemplo correto aluno intermediario',
          children: [
            {
              label: 'Escolher um exemplo positivo',
              disabled: true
            },
            {
              label: 'Professor ensina o exemplo',
              disabled: true
            },
            {
              label: 'Apresentar um domínio',
              disabled: true
            },
            {
              label: 'Alunos realizam a modelagem',
              disabled: true
            },
            {
              label: 'Feedback',
              disabled: true
            }
          ]
        },
        {
          label: 'Exemplo errôneo aluno iniciante (domínio)',
          children: [
            {
              label: 'Apresentar um domínio',
              disabled: true
            },
            {
              label: 'Alunos realizam a modelagem',
              disabled: true
            },
            {
              label: 'Selecionar anti-padrões',
              disabled: true
            },
            {
              label: 'Explicação dos anti-padrões',
              disabled: true
            },
            {
              label: 'Alunos corrigem seus diagramas',
              disabled: true
            },
            {
              label: 'Alunos criam uma nova versão dos diagramas',
              disabled: true
            },
            {
              label: 'Feedback',
              disabled: true
            }
          ]
        }
      ]
    }
  }

})
</script>
