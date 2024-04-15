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
            <br />
            <div class="text-body1">
              Os alunos já tiveram contato com o conteúdo?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                    @click="salvarAulaTeorica({ ...aulaTeorica, conteudo: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.conteudo"
                    val="sim"
                    label="Sim"
                />
                <q-radio
                    @click="salvarAulaTeorica({ ...aulaTeorica, conteudo: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.conteudo"
                    val="nao"
                    label="Não"
                />
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica.conteudo == 'nao'">
              <div class="text-body1">
                Qual o método de ensino prefere utilizar?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, metodoEnsino: 'aulaExpositiva' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.metodoEnsino"
                    val="aulaExpositiva"
                    label="Aula Expositiva"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, metodoEnsino: 'salaInvertida' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.metodoEnsino"
                    val="salaInvertida"
                    label="Sala de aula Invertida"
                  />
                </div>
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica.conteudo == 'nao'">
              <div class="text-body1">
                Já possui exemplos dos conceitos a serem ensinados?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, possuiExemplos: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.possuiExemplos"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, possuiExemplos: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.possuiExemplos"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="tab-atividades">
            <div class="text-h6">Selecione as opções</div>
            <br />
            <div class="text-body1">
              Deseja trabalhar com exemplos corretos ou errôneos?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoExemplo: 'correto' })"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica.tipoExemplo"
                  val="correto"
                  label="Corretos"
                />
                <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoExemplo: 'erroneo' })"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica.tipoExemplo"
                  val="erroneo"
                  label="Errôneos"
                />
              </div>
            </div>

            <div v-show="aulaTeorica.tipoExemplo == 'correto' || aulaTeorica.tipoExemplo == 'erroneo'">
              <div class="text-body1">
                Selecione o nível dos alunos.
                <div class="text-body1 text-italic q-mt-sm">
                  Iniciante: Aluno que não realizou exercícios sobre o conteúdo.
                  <br />
                  Intermediário: Aluno já realizou exercícios sobre o conteúdo
                </div>
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, nivelAluno: 'iniciante' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.nivelAluno"
                    val="iniciante"
                    label="Iniciante"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, nivelAluno: 'intermediario' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.nivelAluno"
                    val="intermediario"
                    label="Intermediário"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="aulaTeorica.tipoExemplo == 'correto' && aulaTeorica.nivelAluno == 'intermediario'"
            >
              <div class="text-body1">
                Deseja combinar essa atividade com outra utilizando exemplos
                errôneos?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, atividadeCombinada: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.atividadeCombinada"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, atividadeCombinada: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.atividadeCombinada"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                aulaTeorica.atividadeCombinada == 'sim' &&
                aulaTeorica.tipoExemplo == 'correto' &&
                aulaTeorica.nivelAluno == 'intermediario'
              "
            >
              <div class="text-body1">
                Deseja adicionar um artefato para os alunos utilizarem durante a
                correção de seus diagramas?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, adicionarArtefato: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.adicionarArtefato"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, adicionarArtefato: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.adicionarArtefato"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                aulaTeorica.atividadeCombinada == 'sim' &&
                aulaTeorica.tipoExemplo == 'correto' &&
                aulaTeorica.nivelAluno == 'intermediario'
              "
            >
              <div class="text-body1">
                Como deseja realizar a primeira correção dos modelos
                construídos pelos alunos?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, primeiraCorrecao: 'proprio' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.primeiraCorrecao"
                    val="proprio"
                    label="Alunos corrigem o próprio diagrama"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, primeiraCorrecao: 'unsDosOutros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.primeiraCorrecao"
                    val="unsDosOutros"
                    label="Alunos corrigem o diagrama de outro aluno"
                  />
                </div>
              </div>
            </div>

            <div v-show="aulaTeorica.tipoExemplo == 'erroneo' && aulaTeorica.nivelAluno == 'iniciante'">
              <div class="text-body1">
                Prefere utilizar qual tipo de artefano no inicio da atividade?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoArtefatoInicio: 'dominio' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoArtefatoInicio"
                    val="dominio"
                    label="Domínio para os alunos realizarem a modelagem"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoArtefatoInicio: 'modeloErros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoArtefatoInicio"
                    val="modeloErros"
                    label="Apresentar um modelo com erros"
                  />
                </div>
              </div>
            </div>
            <div
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'iniciante' &&
                aulaTeorica.tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="text-body1">
                Deseja adicionar um artefato para os alunos utilizarem durante a
                correção de seus diagramas?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, adicionarArtefato: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.adicionarArtefato"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, adicionarArtefato: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.adicionarArtefato"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'iniciante' &&
                aulaTeorica.tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="text-body1">
                Como desejar realizar a primeira correção dos modelos
                construídos pelos alunos?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, primeiraCorrecao: 'proprio' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.primeiraCorrecao"
                    val="proprio"
                    label="Alunos corrigem o próprio diagrama"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, primeiraCorrecao: 'unsDosOutros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.primeiraCorrecao"
                    val="unsDosOutros"
                    label="Alunos corrigem o diagrama de outro aluno"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="aulaTeorica.tipoExemplo == 'erroneo' && aulaTeorica.nivelAluno == 'intermediario'"
            >
              <div class="text-body1">
                Escolha o tipo de atividade que pretente utilizar:
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoAtividadeIntermediario: 'modeloErros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoAtividadeIntermediario"
                    val="modeloErros"
                    label="Apresentar um modelo com erros"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoAtividadeIntermediario: 'jogo7erros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoAtividadeIntermediario"
                    val="jogo7erros"
                    label="Jogo dos 7 erros"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoAtividadeIntermediario: 'alunosIdentificandoErros' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoAtividadeIntermediario"
                    val="alunosIdentificandoErros"
                    label="Alunos identificando erros"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'intermediario' &&
                aulaTeorica.tipoAtividadeIntermediario == 'alunosIdentificandoErros'
              "
            >
              <div class="text-body1">
                Deseja incluir uma aula sobre anti-padrões?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, incluirAulaAntiPadroes: 'sim' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.incluirAulaAntiPadroes"
                    val="sim"
                    label="Sim"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, incluirAulaAntiPadroes: 'nao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.incluirAulaAntiPadroes"
                    val="nao"
                    label="Não"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Selecione as opções</div>
            <br />
            <div class="text-body1">
              Selecione o tipo de devolução dos trabalhos desejado:
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoDevolucao: 'escrito' })"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica.tipoDevolucao"
                  val="escrito"
                  label="Entrega por escrito"
                />
                <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoDevolucao: 'seminario' })"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica.tipoDevolucao"
                  val="seminario"
                  label="Apresentação de seminários"
                />
              </div>
            </div>

            <div v-show="aulaTeorica.tipoDevolucao == 'escrito'">
              <div class="text-body1">
                Selecione o tipo de feedback desejado.
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoFeedback: 'individual' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoFeedback"
                    val="individual"
                    label="Individual"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoFeedback: 'coletivo' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoFeedback"
                    val="coletivo"
                    label="Coletivo"
                  />
                </div>
              </div>
            </div>
            <div
              v-show="aulaTeorica.tipoDevolucao == 'escrito' && aulaTeorica.tipoFeedback == 'coletivo'"
            >
              <div class="text-body1">Selecione o tipo de solução.</div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoSolucao: 'exemploSolucao' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoSolucao"
                    val="exemploSolucao"
                    label="Exemplo de solução"
                  />
                  <q-radio @click = "salvarAulaTeorica({ ...aulaTeorica, tipoSolucao: 'exemploAlunos' })"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="aulaTeorica.tipoSolucao"
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
            <div class="text-h6">Passos sugeridos</div>
            <p v-show="aulaTeorica.conteudo == 'sim'">
              Como os alunos já tiveram contato com o conteúdo anteriormente,
              siga para as próximas opções
            </p>

            <!-- INICIO passos timeline salaInvertida -->
            <div
              id="q-app"
              v-show="aulaTeorica.conteudo == 'nao' && aulaTeorica.metodoEnsino == 'salaInvertida'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Compartilhar o material">
                    <div class="text-body1">
                      Professor deve compartilhar o material com os alunos antes
                      da aula. Esse material pode ser um vídeo, um conteúdo de
                      livro ou recurso online.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Revisão dos conceitos e tira dúvidas"
                  >
                    <div class="text-body1">
                      Já no horário da aula o professor deve iniciar as
                      atividades tirando as dúvidas dos alunos em relação ao
                      material disponibilizado anteriormente.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Fontes de Exemplos"
                    v-show="
                      aulaTeorica.metodoEnsino == 'salaInvertida' && aulaTeorica.possuiExemplos == 'nao'
                    "
                  >
                    <div class="text-body1">Link para o respositório de exemplos</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Explicar exemplos dos conceitos ensinados"
                  >
                    <div class="text-body1">
                      Utilização de exemplos para que os alunos relacionem os
                      conceitos com uma situação concreta
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline salaInvertida -->

            <!-- INICIO passos timeline aulaExpositiva -->
            <div
              id="q-app"
              v-show="aulaTeorica.conteudo == 'nao' && aulaTeorica.metodoEnsino == 'aulaExpositiva'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Palestra">
                    <div class="text-body1">
                      Professor explica o conteúdo aos alunos. Professor deve
                      compartilhar o material com os alunos antes da aula. Esse
                      material pode ser um vídeo, um conteúdo de livro ou
                      recurso online.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Fontes de Exemplos"
                    v-show="
                      aulaTeorica.metodoEnsino == 'aulaExpositiva' &&
                      aulaTeorica.possuiExemplos == 'nao'
                    "
                  >
                    <div class="text-body1">Link para o respositório de exemplos</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Explicar exemplos dos conceitos ensinados"
                  >
                    <div class="text-body1">
                      Utilização de exemplos para que os alunos relacionem os
                      conceitos com uma situação concreta
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline aulaExpositiva -->
          </q-tab-panel>

          <q-tab-panel name="tab-atividades">
            <div class="text-h6">Passos sugeridos</div>
            <!-- INICIO passos exemplos corretos Iniciante -->
            <div
              id="q-app"
              v-show="aulaTeorica.tipoExemplo == 'correto' && aulaTeorica.nivelAluno == 'iniciante'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Escolher o exemplo">
                    <div class="text-body1">
                      Professor seleciona um exemplo do modelo a ser ensinado.
                      Caso não possua exemplo, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Demonstração">
                    <div class="text-body1">Professor demonstra a construção do modelo.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar um domínio">
                    <div class="text-body1">Professor apresenta um domínio para modelagem.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Realização da modelagem">
                    <div class="text-body1">Alunos realizam a modelagem.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstração">
                    <div class="text-body1">
                      Professor faz a demonstração da modelagem correta para o
                      domínio apresentado.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do diagrama">
                    <div class="text-body1">Alunos realizam a correção dos seus diagramas.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos corretos Iniciante -->

            <!-- INICIO passos exemplos corretos intermediário -->
            <div
              id="q-app"
              v-show="aulaTeorica.tipoExemplo == 'correto' && aulaTeorica.nivelAluno == 'intermediario'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Escolher o exemplo">
                    <div class="text-body1">
                      Professor seleciona exemplos positivos de um determinado
                      modelo. Caso não possua exemplo, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Ensino dos exemplos">
                    <div class="text-body1">
                      Professor explica o exemplo positivo para o alunos.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar um domínio">
                    <div class="text-body1">
                      Professor apresenta um domínio para modelagem e explica
                      aos alunos que o conceitos aprendidos com os exemplos
                      corretos serão avaliados.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Realização da modelagem">
                    <div class="text-body1">Alunos realizam a modelagem.</div>
                  </q-timeline-entry>

                  <!-- se for usar atividade combinada colocamos aqui -->
                  <spam v-show="aulaTeorica.atividadeCombinada == 'sim'">
                    <q-timeline-entry title="Selecionar anti-padrões">
                      <div class="text-body1">
                        Professor seleciona os anti-padrões que deseja ensinar.
                        Caso não possua, realize uma busca no
                        <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                          >Repositório de exemplos</a
                        >
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry title="Explicação dos anti-padrões">
                      <div class="text-body1">
                        Professor apresenta os anti-padrões e mostra como
                        solucioná-los.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="aulaTeorica.adicionarArtefato == 'sim'"
                      title="Disponibilizar artefato"
                    >
                      <div class="text-body1">
                        Professor disponibiliza um checklist com os anti-padrões
                        ensinados ou um artefato educacional de inspeção.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="aulaTeorica.primeiraCorrecao == 'proprio'"
                      title="Correção do diagrama"
                    >
                      <div class="text-body1">Alunos realizam a correção dos seus diagramas.</div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="aulaTeorica.primeiraCorrecao == 'unsDosOutros'"
                      title="Correção do diagrama"
                    >
                      <div class="text-body1">
                        Alunos realizam a correção dos diagramas de outros
                        colegas da turma.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry title="Nova versão dos diagramas">
                      <div class="text-body1">
                        Alunos realizam a nova versão dos diagramas aplicando as
                        correções.
                      </div>
                    </q-timeline-entry>
                  </spam>

                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos corretos intermediário -->

            <!-- INICIO passos exemplos errôneos Iniciante com dominio -->
            <div
              id="q-app"
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'iniciante' &&
                aulaTeorica.tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Apresentar um domínio">
                    <div class="text-body1">
                      Professor apresenta um domínio para que os alunos
                      realizagem a modelagem.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Realização da modelagem">
                    <div class="text-body1">Alunos realizam a modelagem.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Selecionar anti-padrões">
                    <div class="text-body1">
                      Professor seleciona os anti-padrões que deseja ensinar.
                      Caso não possua, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Explicação dos anti-padrões">
                    <div class="text-body1">
                      Professor apresenta os anti-padrões e mostra como
                      solucioná-los.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="aulaTeorica.adicionarArtefato == 'sim'"
                    title="Disponibilizar artefato"
                  >
                    <div class="text-body1">
                      Professor disponibiliza um checklist com os anti-padrões
                      ensinados ou um artefato educacional de inspeção.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="aulaTeorica.primeiraCorrecao == 'proprio'"
                    title="Correção do diagrama"
                  >
                    <div class="text-body1">Alunos realizam a correção dos seus diagramas.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="aulaTeorica.primeiraCorrecao == 'unsDosOutros'"
                    title="Correção do diagrama"
                  >
                    <div class="text-body1">
                      Alunos realizam a correção dos diagramas de outros colegas
                      da turma.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Nova versão dos diagramas">
                    <div class="text-body1">
                      Alunos realizam a nova versão dos diagramas aplicando as
                      correções.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Iniciante com dominio -->

            <!-- INICIO passos exemplos errôneos Iniciante com modelo -->
            <div
              id="q-app"
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'iniciante' &&
                aulaTeorica.tipoArtefatoInicio == 'modeloErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Modelo com erros">
                    <div class="text-body1">
                      Como os alunos são de nível iniciante, o professor
                      apresenta um modelo simples com erros. Caso não possua
                      exemplo, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Explicação do modelo">
                    <div class="text-body1">Professor explica os erros existentes no modelo.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstração">
                    <div class="text-body1">
                      Professor faz o passo a passo para corrigir os erros dos
                      modelos.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar outro modelo">
                    <div class="text-body1">
                      Professor apresenta outro modelo com erros similares aos
                      apresentados no passo anterior.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Identificação dos erros">
                    <div class="text-body1">
                      Os alunos devem identificar os erros que existem no modelo
                      apresentado.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do modelo">
                    <div class="text-body1">
                      Alunos criam um novo modelo com uma forma de solucionar os
                      erros existentes.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Iniciante com modelo  -->

            <!-- INICIO passos exemplos errôneos Intermediário com modelo -->
            <div
              id="q-app"
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'intermediario' &&
                aulaTeorica.tipoAtividadeIntermediario == 'modeloErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Modelo com erros">
                    <div class="text-body1">
                      Como os alunos são de nível intermediário, o professor
                      apresenta um modelo com erros de maior complexidade. Caso
                      não possua exemplo, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Explicação do modelo">
                    <div class="text-body1">Professor explica os erros existentes no modelo.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstração">
                    <div class="text-body1">
                      Professor faz o passo a passo para corrigir os erros dos
                      modelos.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentar outro modelo">
                    <div class="text-body1">
                      Professor apresenta outro modelo com erros similares aos
                      apresentados no passo anterior.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Identificação dos erros">
                    <div class="text-body1">
                      Os alunos devem identificar os erros que existem no modelo
                      apresentado.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do modelo">
                    <div class="text-body1">
                      Alunos criam um novo modelo com uma forma de solucionar os
                      erros existentes.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Selecione o feedback a ser utilizado na próxima aba.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Intermediário com modelo  -->

            <!-- INICIO passos exemplos errôneos Intermediário com Jogo 7 erros -->
            <div
              id="q-app"
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'intermediario' &&
                aulaTeorica.tipoAtividadeIntermediario == 'jogo7erros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Início do jogo">
                    <div class="text-body1">
                      Professor apresenta um modelo com 7 erros e explica as
                      regras do jogo. Caso não possua exemplo, realize uma busca
                      no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                    <div class="text-body1 text-italic q-mt-sm">
                  Sugestão de regras: <br/>
                  Erro encontrado corretamente e explicação do motivo correta: 10 pontos<br/>
                  Erro encontrado corretamente, porém, explicação incorreta: 5 pontos<br/>
                  Pódio: Os três alunos com maior pontuação.
                </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    color="orange"
                    title="Início do ciclo de localização de erros"
                  >
                    <div class="text-body1">
                      O aluno que encontrar um erro deve se manifestar e
                      explicar o motivo do erro.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry color="orange" title="Explicação">
                    <div class="text-body1">A explicação do aluno é acompanhada pela turma</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    color="orange"
                    title="Validação do erro encontrado"
                  >
                    <div class="text-body1">
                      O Professor realiza a validação do que foi apresentado
                      pelo aluno. Se o aluno acertou, recebe a pontuação completa, caso
                      contrário, recebe pontuação parcial e o erro continua em aberto.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    color="orange"
                    title="Fim do ciclo de localização de erros"
                  >
                    <div class="text-body1">
                      Caso algum erro não tenha sido localizado, o professor
                      deve explciar o erro.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do modelo">
                    <div class="text-body1">
                      Professor faz a demonstração das correções dos erros do
                      modelo.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Intermediário com Jogo 7 erros  -->

            <!-- INICIO passos exemplos errôneos Intermediário com Alunos identificando erros -->
            <div
              id="q-app"
              v-show="
                aulaTeorica.tipoExemplo == 'erroneo' &&
                aulaTeorica.nivelAluno == 'intermediario' &&
                aulaTeorica.tipoAtividadeIntermediario == 'alunosIdentificandoErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Modelo com erros">
                    <div class="text-body1">
                      Professor apresenta um modelo com erros. Caso não possua
                      exemplo, realize uma busca no
                      <a href="https://tpipernob.github.io/example-basedLearning/#/pt/repository-page" target="_blank"
                        >Repositório de exemplos</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Localização dos erros">
                    <div class="text-body1">
                      Professor estabelece um tempo para os alunos identificarem
                      os erros existentes.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Apresentação dos erros">
                    <div class="text-body1">Os alunos relatam os erros encontrados por eles.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção dos erros apresentados">
                    <div class="text-body1">
                      O Professor faz a correção dos erros identificados pelos
                      alunos.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-show="aulaTeorica.incluirAulaAntiPadroes == 'sim'"
                    title="Apresentação de anti-padrões"
                  >
                    <div class="text-body1">
                      Professor seleciona e apresenta os anti-padrões
                      relacionados aos erros do modelo e mostra como
                      solucioná-los.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Erros não localizados">
                    <div class="text-body1">Professor mostra os erros não localizados.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correção do modelo">
                    <div class="text-body1">
                      Professor faz a demonstração das correções dos erros do
                      modelo.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Intermediário com Alunos identificando erros  -->
          </q-tab-panel>

          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Passos sugeridos</div>
            <!-- INICIO passos feedback por escrito -->
            <div id="q-app" v-show="aulaTeorica.tipoDevolucao == 'escrito'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Entrega por escrito">
                    <div class="text-body1">
                      Os alunos realizam a entrega da atividade solicitada por
                      escrito. Isso pode ser feito por meios digitais, como
                      e-mail ou pelo ambiente educacional utilizado na
                      instituição.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-show="
                      aulaTeorica.tipoDevolucao == 'escrito' && aulaTeorica.tipoFeedback == 'individual'
                    "
                    title="Feedback escrito"
                  >
                    <div class="text-body1">
                      Professor escreve um feedback para a atividade entregue
                      pelo aluno e ecaminha ou apresenta individualmente para
                      aluno que realizou a tarefa.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="
                      aulaTeorica.tipoDevolucao == 'escrito' &&
                      aulaTeorica.tipoFeedback == 'coletivo' &&
                      aulaTeorica.tipoSolucao == 'exemploSolucao'
                    "
                    title="Exemplo de solução"
                  >
                    <div class="text-body1">
                      Professor mostra aos alunos um exemplo de solução correto
                      para a atividade proposta.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="
                      aulaTeorica.tipoDevolucao == 'escrito' &&
                      aulaTeorica.tipoFeedback == 'coletivo' &&
                      aulaTeorica.tipoSolucao == 'exemploAlunos'
                    "
                    title="Soluções exemplares dos alunos"
                  >
                    <div class="text-body1">
                      Professor seleciona e usa alguns exemplos de soluções
                      realizadas pelos alunos que estão corretos.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline feedback por escrito -->

            <!-- INICIO passos feedback por por seminários -->
            <div id="q-app" v-show="aulaTeorica.tipoDevolucao == 'seminario'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Apresentação de seminários">
                    <div class="text-body1">
                      Os alunos realizam a apresentação da atividade
                      desenvolvida por meio de seminários.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback das apresentações">
                    <div class="text-body1">
                      Professor da o feedback para os alunos do conteúdo
                      apresentado nos seminários. Professor pode apontar tanto
                      os acertos quanto os erros dos alunos. Em relação aos
                      erros é importante enfatizar o que pode ser feito para
                      corrigi-lo.
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
        </q-tabs>
      </q-card>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import { ref } from 'vue'

export default {

  methods: {
    salvarAulaTeorica (data) {
      LocalStorage.set('aulaTeorica', data)
    }
  },

  setup () {
    return {
      tab: ref('tab-aulaTeorica')
    }
  },
  data () {
    return {
      aulaTeorica: LocalStorage.getItem('aulaTeorica') || ''

    }
  }
}
</script>
