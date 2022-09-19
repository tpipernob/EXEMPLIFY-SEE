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
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </q-tab-panel>
          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Selecione as opções</div>
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            <div class="text-h6">Passos sugeridos</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="tab-feedback">
            <div class="text-h6">Passos sujeridos</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
      possuiExemplos: ''
    }
  }
}
</script>
