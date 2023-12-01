<template>
  <q-page padding>

    <p class="text-h5">
      Atividades
    </p>
    <p>Ao clicar na seta as opções e os passos sugeridos são exibidos. Clicando nos títulos com setas mais detalhes sobre os passos aparecem a direita.</p>

    <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 100%"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="simple"
            node-key="value"
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
          <q-tab-panel name="defaultCorreto">
              <div class="text-h4 q-mb-md">Exemplos corretos</div>
              <p>Navegue pelas opções a esquerda para ter mais detalhes sobre o passo a passo desejado.</p>
          </q-tab-panel>
          <q-tab-panel name="defaultErroneo">
              <div class="text-h4 q-mb-md">Exemplos errôneos</div>
              <p>Navegue pelas opções a esquerda para ter mais detalhes sobre o passo a passo desejado.</p>
          </q-tab-panel>
          <q-tab-panel name="corretoIniciante">
            <div class="text-h4 q-mb-md">Exemplo correto aluno iniciante</div>
            <p>Aluno iniciante é aquele que ainda não realizou exercícios sobre o conteúdo.</p>
            <p>No caso de alunos iniciantes, é sugerido uma abordagem que se inicia com o professor demonstrando a construção do modelo. </p>
            <p>Após essa etapa, o professor apresenta aos alunos um domínio e solicita que os alunos realizem a construção do modelo para o domínio apresentado. </p>
            <p>Depois da modelagem realizada pelos alunos, o professor apresenta como seria a modelagem correta e solicita que os alunos façam a correção dos seus próprios modelos. Após a correção dos modelos, os alunos enviam para o professor o resultado.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de feedbacks sugeridos</p>
          </q-tab-panel>

          <q-tab-panel name="corretoIntermediario">
            <div class="text-h4 q-mb-md">Exemplo correto aluno intermediario</div>
            <p>O aluno intermediário é aquele que já realizou algum tipo de exercício que aborde o conteúdo a ser explorado.</p>
            <p>O professor começa ensinando aos alunos exemplos positivos do modelo escolhido.</p>
            <p>Em seguida, o professor apresenta um domínio para que os alunos possam construir um modelo de acordo com os padrões apresentados.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de feedbacks sugeridos.</p>
          </q-tab-panel>

          <q-tab-panel name="erroneoInicianteDominio">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno iniciante (domínio)</div>
            <p>Aluno iniciante é aquele que ainda não realizou exercícios sobre o conteúdo.</p>
            <p>O professor inicia apresentando um domínio para que os alunos realizem a modelagem.</p>
            <p>Depois da modelagem realizada pelos alunos, o professor apresenta alguns anti-padrões e como é possível solucioná-los.</p>
            <p>O próximo passo será a correção dos modelos construídos. Para isso, o professor pode optar por disponibilizar um artefato que auxilie os alunos nessa etapa. Esse artefato pode ser um checklist com os anti-padrões ensinados ou um artefato de inspeção.</p>
            <p>Em relação à correção dos diagramas, o professor pode escolher entre o aluno corrigir o seu próprio diagrama ou fazer com que ele corrija o diagrama de um outro colega.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de feedbacks sugeridos.</p>
          </q-tab-panel>

          <q-tab-panel name="erroneoInicianteModelo">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno iniciante (modelo com erros)</div>
            <p>Aluno iniciante é aquele que ainda não realizou exercícios sobre o conteúdo.</p>
            <p>Para alunos iniciantes, a sugestão é que sejam utilizados modelos mais simples.</p>
            <p>O professor apresenta um modelo que contenha erros, explica os erros existentes e faz o passo a passo para corrigir esses erros.</p>
            <p>O professor apresenta um outro modelo e solicita que os alunos localizem os erros e construam um novo modelo que apresente a solução dos erros encontrados.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de feedbacks sugeridos.</p>
          </q-tab-panel>

          <q-tab-panel name="erroneoIntermediarioModelo">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno intermediário - Usando modelo com erros</div>
            <p>O aluno intermediário é aquele que já realizou algum tipo de exercício que aborde o conteúdo a ser explorado.</p>
            <p>Para alunos intermediários, a sugestão é que sejam utilizados modelos mais complexos.</p>
            <p>O professor apresenta um modelo que contenha erros, explica os erros existentes e faz o passo a passo para corrigir esses erros.</p>
            <p>O professor apresenta um outro modelo e solicita que os alunos localizem os erros e construam um novo modelo que apresente a solução dos erros encontrados.</p>
            <p>Para finalizar a atividade o professor pode optar por um dos tipos de feedbacks sugeridos.</p>
          </q-tab-panel>

          <q-tab-panel name="erroneoIntermediarioJogo7erros">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno intermediário - Jogo 7 erros</div>
            <p>O aluno intermediário é aquele que já realizou algum tipo de exercício que aborde o conteúdo a ser explorado.</p>
            <p>O professor inicia as atividades apresentando um modelo com sete erros e explicando as regras do jogo.</p>
            <p>Sugestão de regras: <br>
                Erro encontrado corretamente e explicação do motivo correta: 10 pontos <br>
                Erro encontrado corretamente, porém, explicação incorreta: 5 pontos <br>
                Pódio: Os três alunos com maior pontuação.</p>
            <p>Em seguida, a atividade entra em um loop no qual os alunos tentam localizar os erros presentes no modelo. Cada erro localizado precisa ser justificado pelo aluno perante a sala e logo em seguida o professor realiza a validação da explicação. Isso se repete até que mais nenhum erro seja apontado pelos alunos.</p>
            <p>Por fim, o professor verifica se algum erro existente não foi localizado pelos alunos. Caso exista, o professor explica o erro e encerra a atividade demonstrando a correção do modelo.</p>
          </q-tab-panel>

          <q-tab-panel name="erroneoIntermediarioIdentificando">
            <div class="text-h4 q-mb-md">Exemplo errôneo aluno intermediário - Alunos identificando erros</div>
            <p>A atividade começa com o professor apresentando um modelo com erros.</p>
            <p>Na sequência, o professor estabelece um tempo para que os alunos possam identificar os erros existentes.</p>
            <p>Após os alunos relatarem os erros, o professor faz a correção dos erros identificados.</p>
            <p>O professor pode escolher entre apresentar ou não uma aula com os anti-padrões relacionados aos erros do modelo e mostra como solucioná-los.</p>
            <p>Para finalizar a atividade, o professor mostra os erros não encontrados (caso existam) e demonstra a correção do diagrama.</p>
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
      selected: ref('defaultCorreto'),

      simple: [
        {
          label: 'Exemplo correto',
          value: 'defaultCorreto',
          children: [
            {
              label: 'Aluno Iniciante',
              value: 'corretoIniciante',
              children: [
                {
                  label: '- Escolher o exemplo',
                  disabled: true
                },
                {
                  label: '- Professor realiza a demonstração',
                  disabled: true
                },
                {
                  label: '- Apresentar um domínio',
                  disabled: true
                },
                {
                  label: '- Alunos realizam a modelagem',
                  disabled: true
                },
                {
                  label: '- Professor realiza a demonstração',
                  disabled: true
                },
                {
                  label: '- Alunos corrigem o modelo',
                  disabled: true
                },
                {
                  label: '- Feedback',
                  disabled: true
                }
              ]
            },
            {
              label: 'Aluno intermediario',
              value: 'corretoIntermediario',
              children: [
                {
                  label: '- Escolher um exemplo positivo',
                  disabled: true
                },
                {
                  label: '- Professor ensina o exemplo',
                  disabled: true
                },
                {
                  label: '- Apresentar um domínio',
                  disabled: true
                },
                {
                  label: '- Alunos realizam a modelagem',
                  disabled: true
                },
                {
                  label: '- Feedback',
                  disabled: true
                }
              ]
            }
          ]
        },
        {
          label: 'Exemplo errôneo',
          value: 'defaultErroneo',
          children: [
            {
              label: 'Aluno Iniciante',
              value: 'erroneoIniciante',
              children: [
                {
                  label: 'Modelagem de domínio',
                  value: 'erroneoInicianteDominio',
                  children: [
                    {
                      label: '- Apresentar um domínio',
                      disabled: true
                    },
                    {
                      label: '- Alunos realizam a modelagem',
                      disabled: true
                    },
                    {
                      label: '- Selecionar anti-padrões',
                      disabled: true
                    },
                    {
                      label: '- Explicação dos anti-padrões',
                      disabled: true
                    },
                    {
                      label: '- Alunos corrigem seus diagramas',
                      disabled: true
                    },
                    {
                      label: '- Alunos criam uma nova versão dos diagramas',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }

                  ]
                },
                {
                  label: 'Modelo com erros',
                  value: 'erroneoInicianteModelo',
                  children: [
                    {
                      label: '- Apresentar um modelo com erros',
                      disabled: true
                    },
                    {
                      label: '- Professor explica os erros modelo',
                      disabled: true
                    },
                    {
                      label: '- Professor demonstra a correção',
                      disabled: true
                    },
                    {
                      label: '- Professor apresenta outro modelo',
                      disabled: true
                    },
                    {
                      label: '- Alunos identificam os erros',
                      disabled: true
                    },
                    {
                      label: '- Alunos corrigem o modelo',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }
                  ]
                }
              ]
            },
            {
              label: 'Aluno Intermediário',
              value: 'erroneoIntermediario',
              children: [
                {
                  label: 'Modelo com erros',
                  value: 'erroneoIntermediarioModelo',
                  children: [
                    {
                      label: '- Apresentar um modelo com erros',
                      disabled: true
                    },
                    {
                      label: '- Professor explica os erros modelo',
                      disabled: true
                    },
                    {
                      label: '- Professor demonstra a correção',
                      disabled: true
                    },
                    {
                      label: '- Professor apresenta outro modelo',
                      disabled: true
                    },
                    {
                      label: '- Alunos identificam os erros',
                      disabled: true
                    },
                    {
                      label: '- Alunos corrigem o modelo',
                      disabled: true
                    },
                    {
                      label: '- Feedback',
                      disabled: true
                    }
                  ]
                },
                {
                  label: 'Jogo dos 7 erros',
                  value: 'erroneoIntermediarioJogo7erros',
                  children: [
                    {
                      label: '- Professor apresenta um modelo com 7 erros',
                      disabled: true
                    },
                    {
                      label: '- Alunos tentam encontrar encontrar os erros',
                      disabled: true
                    },
                    {
                      label: '- Aluno explica o motivo do erro encontrado',
                      disabled: true
                    },
                    {
                      label: '- Professor faz a validação do erro encontrado',
                      disabled: true
                    },
                    {
                      label: '- Se algum erro não for localizado, o professor faz a explicação do erro',
                      disabled: true
                    },
                    {
                      label: '- Professor faz a demonstração das correções dos erros do modelo',
                      disabled: true
                    }
                  ]
                },
                {
                  label: 'Alunos identificando erros',
                  value: 'erroneoIntermediarioIdentificando',
                  children: [
                    {
                      label: '- Professor apresenta um modelo com erros',
                      disabled: true
                    },
                    {
                      label: '- Professor estabelece um tempo para os alunos identificarem os erros',
                      disabled: true
                    },
                    {
                      label: '- Alunos relatam os erros encontrados',
                      disabled: true
                    },
                    {
                      label: '- Professor faz a correção dos erros encontrados',
                      disabled: true
                    },
                    {
                      label: '- Professor mostra os erros não localizados',
                      disabled: true
                    },
                    {
                      label: '- Opcional: Apresentação de anti-padrões',
                      disabled: true
                    },
                    {
                      label: '- Professor faz a demonstração das correções dos erros do modelo',
                      disabled: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
})

</script>
