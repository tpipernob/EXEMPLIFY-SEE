<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="tab-aulaTeorica" label="Aula Teórica" />
          <q-tab name="tab-atividades" label="Atividades" />
          <q-tab name="tab-feedback" label="Feedback" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tab-aulaTeorica">
            <div class="text-h6">Selecione as opções</div>
            <br/>
            <div class="text-body1">
              Os alunos já tiveram contato com o conteúdo?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica"
                  val="sim"
                  label="Sim"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica"
                  val="nao"
                  label="Não"
                />
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica == 'nao'">
              <div class="text-body1">
                Qual o método de ensino prefere utilizar?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="metodoEnsino"
                    val="aulaEspositiva"
                    label="Aula Espositiva"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="metodoEnsino"
                    val="salaInvertida"
                    label="Sala de aula Invertida"
                  />
                </div>
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica == 'nao'">
              <div class="text-body1">
                Já possui exemplos dos conceitos a serem ensinados?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="possuiExemplos"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="possuiExemplos"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="tab-atividades">
            <div class="text-h6">Selecione as opções</div>
            <br/>
            <div class="text-body1">
              Deseja trabalhar com exemplos corretos ou errôneos?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoExemplo"
                  val="correto"
                  label="Corretos"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoExemplo"
                  val="erroneo"
                  label="Errôneos"
                />
              </div>
            </div>

            <div v-show="tipoExemplo == 'correto' || tipoExemplo == 'erroneo'">
              <div class="text-body1">
                Selecione o nível dos alunos.
                <div class="text-body2 text-italic q-mt-sm">
                  Iniciante: Aluno que não realizou exercícios sobre o conteúdo.
                  <br>
                  Intermediário: Aluno já realizou exercícios sobre o conteúdo
                </div>
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="nivelAluno"
                    val="iniciante"
                    label="Iniciante"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="nivelAluno"
                    val="intermediario"
                    label="Intermediário"
                  />
                </div>
              </div>
            </div>

          </q-tab-panel>
          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Selecione as opções</div>
            <br/>
            <div class="text-body1">
              Selecione o tipo de devolução dos trabalhos desejado:
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoDevolucao"
                  val="escrito"
                  label="Entrega por escrito"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoDevolucao"
                  val="seminario"
                  label="Apresentação de seminários"
                />
              </div>
            </div>

            <div v-show="tipoDevolucao == 'escrito'">
              <div class="text-body1">
                Selecione o tipo de feedback desejado.
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoFeedback"
                    val="individual"
                    label="Individual"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoFeedback"
                    val="coletivo"
                    label="Coletivo"
                  />
                </div>
              </div>
            </div>
            <div v-show="tipoDevolucao == 'escrito' && tipoFeedback == 'coletivo'">
              <div class="text-body1">
                Selecione o tipo de solução.
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoSolucao"
                    val="exemploSolucao"
                    label="Exemplo de solução"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoSolucao"
                    val="exemploAlunos"
                    label="Soluções exemplares dos alunos"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tab-aulaTeorica">
            <div class="text-h6">Passos sujeridos</div>
            <p v-show="aulaTeorica == 'sim'">
              Como os alunos já tiveram contato com o conteúdo anteriormente,
              siga para as próximas opções
            </p>

            <!-- INICIO passos timeline salaInvertida -->
            <div id="q-app" v-show="aulaTeorica == 'nao' && metodoEnsino == 'salaInvertida'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Compartilhar o material">
                    <div>
                      Professor deve compartilhar o material com os alunos antes
                      da aula. Esse material pode ser um vídeo, um conteúdo de
                      livro ou recurso online.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Revisão dos conceitos e tira dúvidas">
                    <div>
                        Já no o horário da aula o professor deve iniciar as atividades
                  tirando as dúvidas dos alunos em relação ao material
                  disponibilizado anteriormente.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Fontes de Exemplos" v-show="metodoEnsino == 'salaInvertida' && possuiExemplos == 'nao'">
                    <div>
                        Link para o respositório de exemplos
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Explicar exemplos dos conceitos ensinados" >
                    <div>
                        Utilização de exemplos para que os alunos relacionem os conceitos com uma situação concreta
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline salaInvertida -->

            <!-- INICIO passos timeline aulaEspositiva -->
            <div id="q-app" v-show="aulaTeorica == 'nao' && metodoEnsino == 'aulaEspositiva'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Palestra">
                    <div>
                        Professor explica o conteúdo aos alunos. Professor deve
                  compartilhar o material com os alunos antes da aula. Esse
                  material pode ser um vídeo, um conteúdo de livro ou recurso
                  online.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Fontes de Exemplos" v-show="metodoEnsino == 'aulaEspositiva' && possuiExemplos == 'nao'">
                    <div>
                        Link para o respositório de exemplos
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Explicar exemplos dos conceitos ensinados" >
                    <div>
                        Utilização de exemplos para que os alunos relacionem os conceitos com uma situação concreta
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline aulaEspositiva -->

          </q-tab-panel>

          <q-tab-panel name="tab-atividades">

            <div class="text-h6">Passos sujeridos</div>

            <!-- INICIO passos exemplos corretos Iniciante -->
            <div id="q-app" v-show="tipoExemplo == 'correto' && nivelAluno == 'iniciante'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Escolher Exemplo">
                    <div>
                      Professor seleciona um exemplo do modelo a ser ensinado. Caso não possua exemplo, realize uma busca no <a href="/repositorioExemplos" target="_blank">Repositório de exemplos</a>
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Demonstração">
                    <div>
                      Professor demonstra a construção do modelo.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar um domínio">
                    <div>
                      Professor apresenta um domínio para modelagem.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Realização da modelagem" >
                    <div>
                      Alunos realizam a modelagem.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstração" >
                    <div>
                      Professor faz a demonstração da modelagem correta para o domínio apresentado.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do diagrama" >
                    <div>
                      Alunos realizam a correção dos seus diagramas.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback" >
                    <div>
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos corretos Iniciante -->

            <!-- INICIO passos exemplos errôneos Iniciante -->
            <div id="q-app" v-show="tipoExemplo == 'erroneo' && nivelAluno == 'iniciante'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Modelo com erros">
                    <div>
                      Professor apresenta um modelo com erros. Caso não possua exemplo, realize uma busca no <a href="/repositorioExemplos" target="_blank">Repositório de exemplos</a>
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Demonstração">
                    <div>
                      Professor demonstra a construção do modelo.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar um domínio">
                    <div>
                      Professor apresenta um domínio para modelagem.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Realização da modelagem" >
                    <div>
                      Alunos realizam a modelagem.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstração" >
                    <div>
                      Professor faz a demonstração da modelagem correta para o domínio apresentado.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do diagrama" >
                    <div>
                      Alunos realizam a correção dos seus diagramas.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback" >
                    <div>
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos corretos Iniciante -->
          </q-tab-panel>

          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Passos sujeridos</div>
            <!-- INICIO passos feedback por escrito -->
            <div id="q-app" v-show="tipoDevolucao == 'escrito'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Entrega por escrito">
                    <div>
                      Os alunos realizam a entrega da atividade solicitada por escrito. Isso pode ser feito por meios digitais, como e-mail ou pelo ambiente educacional utilizado na instituição.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry v-show="tipoDevolucao == 'escrito' && tipoFeedback == 'individual' " title="Feedback escrito">
                    <div>
                      Professor escreve um feedback para a atividade entregue pelo aluno e ecaminha ou apresenta individualmente para aluno que realizou a tarefa.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry v-if="tipoDevolucao == 'escrito' && tipoFeedback == 'coletivo' && tipoSolucao == 'exemploSolucao' " title="Exemplo de solução">
                    <div>
                      Professor mostra aos alunos um exemplo de solução correto para a atividade proposta.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry v-if="tipoDevolucao == 'escrito' && tipoFeedback == 'coletivo' && tipoSolucao == 'exemploAlunos' " title="Soluções exemplares dos alunos">
                    <div>
                      Professor seleciona e usa alguns exemplos de soluções realizadas pelos alunos que estão corretos.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline feedback por escrito -->

            <!-- INICIO passos feedback por por seminários -->
            <div id="q-app" v-show="tipoDevolucao == 'seminario'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Apresentação de seminários">
                    <div>
                      Os alunos realizam a apresentação da atividade desenvolvida por meio de seminários.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback das apresentações">
                    <div>
                      Professor da o feedback para os alunos do conteúdo apresentado nos seminários. Professor pode apontar tanto os acertos quanto os erros dos alunos. Em relação aos erros é importante enfatizar o que pode ser feito para corrigi-lo.
                    </div>
                  </q-timeline-entry>

                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline feedback por seminários -->
          </q-tab-panel>
        </q-tab-panels>

        <q-separator />

        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
          narrow-indicator
        >
          <q-tab name="tab-aulaTeorica" label="Aula Teórica" />
          <q-tab name="tab-atividades" label="Atividades" />
          <q-tab name="tab-feedback" label="Feedback" />
        </q-tabs>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('tab-aulaTeorica')
    }
  },
  data () {
    return {
      aulaTeorica: '',
      metodoEnsino: '',
      possuiExemplos: '',

      tipoExemplo: '',
      nivelAluno: '',

      tipoDevolucao: '',
      tipoFeedback: '',
      tipoSolucao: ''

    }
  }
}
</script>
