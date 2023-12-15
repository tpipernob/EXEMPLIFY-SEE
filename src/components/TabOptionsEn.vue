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
          <q-tab name="tab-aulaTeorica" label="Theoretical Class" />
          <q-tab name="tab-atividades" label="Activities" />
          <q-tab name="tab-feedback" label="Feedback" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tab-aulaTeorica">
            <div class="text-h6">Select the options.</div>
            <br />
            <div class="text-body1">
              Have the students already had contact with the content?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica"
                  val="sim"
                  label="Yes"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="aulaTeorica"
                  val="nao"
                  label="No"
                />
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica == 'nao'">
              <div class="text-body1">
                Which teaching method do you prefer to use?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="metodoEnsino"
                    val="aulaexpositiva"
                    label="Expository Lecture"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="metodoEnsino"
                    val="salaInvertida"
                    label="Flipped Classroom"
                  />
                </div>
              </div>
            </div>

            <div id="metodo" v-show="aulaTeorica == 'nao'">
              <div class="text-body1">
                Do you already have examples of the concepts to be taught?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="possuiExemplos"
                    val="sim"
                    label="Yes"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="possuiExemplos"
                    val="nao"
                    label="No"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="tab-atividades">
            <div class="text-h6">Select the options.</div>
            <br />
            <div class="text-body1">
              Do you want to work with correct or incorrect examples?
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoExemplo"
                  val="correto"
                  label="Correct"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoExemplo"
                  val="erroneo"
                  label="Incorrect"
                />
              </div>
            </div>

            <div v-show="tipoExemplo == 'correto' || tipoExemplo == 'erroneo'">
              <div class="text-body1">
                Select the students level.
                <div class="text-body1 text-italic q-mt-sm">
                  Beginner: Student who has not completed exercises on the content.
                  <br />
                  Intermediate: Student has already completed exercises on the content.
                </div>
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="nivelAluno"
                    val="iniciante"
                    label="Beginner"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="nivelAluno"
                    val="intermediario"
                    label="Intermediate"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="tipoExemplo == 'correto' && nivelAluno == 'intermediario'"
            >
              <div class="text-body1">
                Do you want to combine this activity with another using incorrect examples?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="atividadeCombinada"
                    val="sim"
                    label="Yes"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="atividadeCombinada"
                    val="nao"
                    label="No"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                atividadeCombinada == 'sim' &&
                tipoExemplo == 'correto' &&
                nivelAluno == 'intermediario'
              "
            >
              <div class="text-body1">
                Do you want to add an artifact for the students to use during the correction of their diagrams?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="adicionarArtefato"
                    val="sim"
                    label="Yes"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="adicionarArtefato"
                    val="nao"
                    label="No"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                atividadeCombinada == 'sim' &&
                tipoExemplo == 'correto' &&
                nivelAluno == 'intermediario'
              "
            >
              <div class="text-body1">
                How do you wish to conduct the initial correction of the models built by the students?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="primeiraCorrecao"
                    val="proprio"
                    label="Students correct their own diagram"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="primeiraCorrecao"
                    val="unsDosOutros"
                    label="Students correct another student's diagram"
                  />
                </div>
              </div>
            </div>

            <div v-show="tipoExemplo == 'erroneo' && nivelAluno == 'iniciante'">
              <div class="text-body1">
                What type of artifact do you prefer to use at the beginning of the activity?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoArtefatoInicio"
                    val="dominio"
                    label="Domain for students to perform modeling."
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoArtefatoInicio"
                    val="modeloErros"
                    label="Present a model with errors."
                  />
                </div>
              </div>
            </div>
            <div
              v-show="
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'iniciante' &&
                tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="text-body1">
                Do you want to add an artifact for the students to use during the correction of their diagrams?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="adicionarArtefato"
                    val="sim"
                    label="Yes"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="adicionarArtefato"
                    val="nao"
                    label="No"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'iniciante' &&
                tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="text-body1">
                How do you wish to conduct the initial correction of the models built by the students?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="primeiraCorrecao"
                    val="proprio"
                    label="Students correct their own diagram."
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="primeiraCorrecao"
                    val="unsDosOutros"
                    label="Students correct another student's diagram."
                  />
                </div>
              </div>
            </div>

            <div
              v-show="tipoExemplo == 'erroneo' && nivelAluno == 'intermediario'"
            >
              <div class="text-body1">
                Choose the type of activity you intend to use:
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoAtividadeIntermediario"
                    val="modeloErros"
                    label="Present a model with errors."
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoAtividadeIntermediario"
                    val="jogo7erros"
                    label="Spot the 7 Errors Game"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoAtividadeIntermediario"
                    val="alunosIdentificandoErros"
                    label="Students identifying errors"
                  />
                </div>
              </div>
            </div>

            <div
              v-show="
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'intermediario' &&
                tipoAtividadeIntermediario == 'alunosIdentificandoErros'
              "
            >
              <div class="text-body1">
                Do you want to include a lesson on anti-patterns?
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="incluirAulaAntiPadroes"
                    val="sim"
                    label="Yes"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="incluirAulaAntiPadroes"
                    val="nao"
                    label="No"
                  />
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Select the options.</div>
            <br />
            <div class="text-body1">
              Select the desired type of feedback for the assignments:
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoDevolucao"
                  val="escrito"
                  label="Written submission"
                />
                <q-radio
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  v-model="tipoDevolucao"
                  val="seminario"
                  label="Seminar presentation"
                />
              </div>
            </div>

            <div v-show="tipoDevolucao == 'escrito'">
              <div class="text-body1">
                Select the desired type of feedback.
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoFeedback"
                    val="individual"
                    label="Individual feedback"
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoFeedback"
                    val="coletivo"
                    label="Collective Feedback"
                  />
                </div>
              </div>
            </div>
            <div
              v-show="tipoDevolucao == 'escrito' && tipoFeedback == 'coletivo'"
            >
              <div class="text-body1">Select the type of solution.</div>
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoSolucao"
                    val="exemploSolucao"
                    label="Example of solution."
                  />
                  <q-radio
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="tipoSolucao"
                    val="exemploAlunos"
                    label="Exemplary solutions from the students"
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
            <div class="text-h6">Recommended steps</div>
            <p v-show="aulaTeorica == 'sim'">
              As the students have already been exposed to the content, proceed to the next options.
            </p>

            <!-- INICIO passos timeline salaInvertida -->
            <div
              id="q-app"
              v-show="aulaTeorica == 'nao' && metodoEnsino == 'salaInvertida'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Share the material.">
                    <div class="text-body1">
                      The teacher should share the material with the students before the class. This material can be a video, content from a book, or an online resource.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Review of concepts and Q&A (Questions and Answers)."
                  >
                    <div class="text-body1">
                      During the class time, the teacher should start the activities by addressing any questions the students may have regarding the material provided earlier.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Sources of Examples"
                    v-show="
                      metodoEnsino == 'salaInvertida' && possuiExemplos == 'nao'
                    "
                  >
                    <div class="text-body1">Link to the examples repository.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Explain examples of the taught concepts."
                  >
                    <div class="text-body1">
                      Use of examples for students to relate concepts to a concrete situation.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline salaInvertida -->

            <!-- INICIO passos timeline aulaexpositiva -->
            <div
              id="q-app"
              v-show="aulaTeorica == 'nao' && metodoEnsino == 'aulaexpositiva'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Lecture">
                    <div class="text-body1">
                      The teacher explains the content to the students. The teacher should share the material with the students before the class. This material can be a video, content from a book, or an online resource.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    title="Sources of Examples"
                    v-show="
                      metodoEnsino == 'aulaexpositiva' &&
                      possuiExemplos == 'nao'
                    "
                  >
                    <div class="text-body1">Link to the examples repository.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    title="Explain examples of the taught concepts"
                  >
                    <div class="text-body1">
                      Use of examples for students to relate concepts to a concrete situation.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline aulaexpositiva -->
          </q-tab-panel>

          <q-tab-panel name="tab-atividades">
            <div class="text-h6">Recommended steps.</div>
            <!-- INICIO passos exemplos corretos Iniciante -->
            <div
              id="q-app"
              v-show="tipoExemplo == 'correto' && nivelAluno == 'iniciante'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Choose the example">
                    <div class="text-body1">
                      The teacher selects an example of the model to be taught. If there is no example available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Demonstration">
                    <div class="text-body1">The teacher demonstrates the construction of the model.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Presenting a domain">
                    <div class="text-body1">The teacher presents a domain for modeling.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Modeling implementation">
                    <div class="text-body1">Students perform the modeling.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstration">
                    <div class="text-body1">
                      The teacher demonstrates the correct modeling for the presented domain.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Diagram correction">
                    <div class="text-body1">Students correct their diagrams.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Select the feedback to be used in the next tab.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos corretos Iniciante -->

            <!-- INICIO passos exemplos corretos intermediário -->
            <div
              id="q-app"
              v-show="tipoExemplo == 'correto' && nivelAluno == 'intermediario'"
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Choose the example">
                    <div class="text-body1">
                      The teacher selects positive examples of a specific model. If there are no examples available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Teaching of examples">
                    <div class="text-body1">
                      The teacher explains the positive example to the students
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Presenting a domain">
                    <div class="text-body1">
                      The teacher introduces a domain for modeling and explains to the students that the concepts learned from the correct examples will be evaluated.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Modeling implementation">
                    <div class="text-body1">Students perform the modeling</div>
                  </q-timeline-entry>

                  <!-- se for usar atividade combinada colocamos aqui -->
                  <spam v-show="atividadeCombinada == 'sim'">
                    <q-timeline-entry title="Selecting anti-patterns">
                      <div class="text-body1">
                        The teacher selects the anti-patterns they want to teach. If none are available, perform a search in the
                        <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                          >Example Repository</a
                        >
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry title="Explanation of anti-patterns.">
                      <div class="text-body1">
                        The teacher presents the anti-patterns and demonstrates how to resolve them.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="adicionarArtefato == 'sim'"
                      title="Provide artifact"
                    >
                      <div class="text-body1">
                        The teacher provides a checklist with the taught anti-patterns or an educational inspection artifact.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="primeiraCorrecao == 'proprio'"
                      title="Diagram correction"
                    >
                      <div class="text-body1">Students correct their diagrams.</div>
                    </q-timeline-entry>
                    <q-timeline-entry
                      v-if="primeiraCorrecao == 'unsDosOutros'"
                      title="Diagram correction"
                    >
                      <div class="text-body1">
                        Students correct the diagrams of their classmates.
                      </div>
                    </q-timeline-entry>
                    <q-timeline-entry title="New version of the diagrams">
                      <div class="text-body1">
                        Students create the new version of the diagrams applying the corrections.
                      </div>
                    </q-timeline-entry>
                  </spam>

                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Select the feedback to be used in the next tab.
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
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'iniciante' &&
                tipoArtefatoInicio == 'dominio'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Presenting a domain">
                    <div class="text-body1">
                      The teacher introduces a domain for the students to carry out the modeling.
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Implementation of modeling">
                    <div class="text-body1">Students carry out the modeling.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Selecting anti-patterns.">
                    <div class="text-body1">
                      The teacher selects the anti-patterns they want to teach. If none are available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Explanation of anti-patterns.">
                    <div class="text-body1">
                      The teacher presents the anti-patterns and demonstrates how to solve them.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="adicionarArtefato == 'sim'"
                    title="Provide artifact"
                  >
                    <div class="text-body1">
                      The teacher provides a checklist with the taught anti-patterns or an educational inspection artifact.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="primeiraCorrecao == 'proprio'"
                    title="Diagram correction"
                  >
                    <div class="text-body1">Students correct their diagrams.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="primeiraCorrecao == 'unsDosOutros'"
                    title="Diagram correction"
                  >
                    <div class="text-body1">
                      Students correct the diagrams of their classmates.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="New version of the diagrams">
                    <div class="text-body1">
                      Students create the new version of the diagrams applying the corrections.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Select the feedback to be used in the next tab.
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
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'iniciante' &&
                tipoArtefatoInicio == 'modeloErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Model with errors">
                    <div class="text-body1">
                      As the students are at a beginner level, the teacher presents a simple model with errors. If there is no example available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Explanation of the model">
                    <div class="text-body1">The teacher explains the errors present in the model.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstration">
                    <div class="text-body1">
                      The teacher provides a step-by-step guide to correct the errors in the models.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Present another model">
                    <div class="text-body1">
                      The teacher presents another model with errors similar to those shown in the previous step.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Identification of errors">
                    <div class="text-body1">
                     The students must identify the errors in the presented model.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Model correction">
                    <div class="text-body1">
                      Students create a new model with a way to address the existing errors.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Select the feedback to be used in the next tab.
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
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'intermediario' &&
                tipoAtividadeIntermediario == 'modeloErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Model with errors">
                    <div class="text-body1">
                      As the students are at an intermediate level, the teacher presents a Model with errors of greater complexity. If there is no example available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Explanation of the model">
                    <div class="text-body1">The teacher explains the errors present in the model.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Demonstration">
                    <div class="text-body1">
                      The teacher provides a step-by-step guide to correct the errors in the models.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Present another model">
                    <div class="text-body1">
                      The teacher presents another model with errors similar to those shown in the previous step.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Identification of errors">
                    <div class="text-body1">
                     The students must identify the errors in the presented model.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Model correction">
                    <div class="text-body1">
                      Students create a new model with a way to address the existing errors.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback">
                    <div class="text-body1">
                      Select the feedback to be used in the next tab.
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
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'intermediario' &&
                tipoAtividadeIntermediario == 'jogo7erros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Game start">
                    <div class="text-body1">
                      The teacher presents a model with 7 errors and explains the rules of the game. If there is no example available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                    <div class="text-body1 text-italic q-mt-sm">
                  Rule suggestions: <br/>
                  Correctly identified error with a correct explanation: 10 points<br/>
                  Correctly identified error, but incorrect explanation: 5 points<br/>
                  Podium: The three students with the highest score.
                </div>
                  </q-timeline-entry>

                  <q-timeline-entry
                    color="orange"
                    title="Start of the error localization cycle"
                  >
                    <div class="text-body1">
                      The student who finds an error must speak up and explain the reason for the error.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry color="orange" title="Explanation">
                    <div class="text-body1">The student's explanation is followed by the class</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    color="orange"
                    title="Validation of the identified error"
                  >
                    <div class="text-body1">
                      The teacher validates what was presented by the student. If the student is correct, they receive full points; otherwise, they receive partial points, and the error remains open.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    color="orange"
                    title="End of the error localization cycle"
                  >
                    <div class="text-body1">
                      If any error has not been located, the teacher must explain the error.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Model correction">
                    <div class="text-body1">
                      The teacher demonstrates the corrections of the model's errors.
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
                tipoExemplo == 'erroneo' &&
                nivelAluno == 'intermediario' &&
                tipoAtividadeIntermediario == 'alunosIdentificandoErros'
              "
            >
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Model with errors">
                    <div class="text-body1">
                      The teacher presents a model with errors. If there is no example available, perform a search in the
                      <a href="https://tpipernob.github.io/example-basedLearning/#/en/repository-page" target="_blank"
                        >Example Repository</a
                      >
                    </div>
                  </q-timeline-entry>

                  <q-timeline-entry title="Error localization">
                    <div class="text-body1">
                      The teacher sets a time for the students to identify the existing errors.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Presentation of errors.">
                    <div class="text-body1">The students report the errors they found.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Correction of presented errors">
                    <div class="text-body1">
                      The teacher corrects the errors identified by the students.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-show="incluirAulaAntiPadroes == 'sim'"
                    title="Presentation of anti-patterns"
                  >
                    <div class="text-body1">
                      The teacher selects and presents the anti-patterns related to the model's errors and demonstrates how to resolve them.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Errors not found">
                    <div class="text-body1">The teacher shows the errors not found.</div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Model correction">
                    <div class="text-body1">
                      The teacher demonstrates the corrections of the model's errors.
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
            <!-- FIM passos timeline exemplos errôneos Intermediário com Alunos identificando erros  -->
          </q-tab-panel>

          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Recommended steps</div>
            <!-- INICIO passos feedback por escrito -->
            <div id="q-app" v-show="tipoDevolucao == 'escrito'">
              <div class="q-px-lg q-pb-md">
                <q-timeline color="primary">
                  <q-timeline-entry title="Written submission">
                    <div class="text-body1">
                      The students submit the requested activity in writing. This can be done digitally, such as by email or through the educational platform used in the institution.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-show="
                      tipoDevolucao == 'escrito' && tipoFeedback == 'individual'
                    "
                    title="Written feedback"
                  >
                    <div class="text-body1">
                      The teacher writes feedback for the activity submitted by the student and forwards or presents it individually to the student who completed the task.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="
                      tipoDevolucao == 'escrito' &&
                      tipoFeedback == 'coletivo' &&
                      tipoSolucao == 'exemploSolucao'
                    "
                    title="Example of solution"
                  >
                    <div class="text-body1">
                      The teacher shows the students a correct example of a solution for the proposed activity.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="
                      tipoDevolucao == 'escrito' &&
                      tipoFeedback == 'coletivo' &&
                      tipoSolucao == 'exemploAlunos'
                    "
                    title="Exemplary solutions from students"
                  >
                    <div class="text-body1">
                      The teacher selects and uses some examples of solutions carried out by students that are correct.
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
                  <q-timeline-entry title="Seminar presentation">
                    <div class="text-body1">
                      The students present the activity developed through seminars.
                    </div>
                  </q-timeline-entry>
                  <q-timeline-entry title="Feedback from presentations">
                    <div class="text-body1">
                      The teacher gives feedback to the students on the content presented in the seminars. The teacher can point out both the students' successes and mistakes. Regarding the mistakes, it is important to emphasize what can be done to correct them.
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
      atividadeCombinada: '',
      tipoArtefatoInicio: '',
      adicionarArtefato: '',
      primeiraCorrecao: '',
      tipoAtividadeIntermediario: '',
      incluirAulaAntiPadroes: '',

      tipoDevolucao: '',
      tipoFeedback: '',
      tipoSolucao: ''
    }
  }
}
</script>
