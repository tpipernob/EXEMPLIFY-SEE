<template>
  <q-page padding>

    <p class="text-h5">
      Welcome!
    </p>
    <p class="text-body1">
      O objetivo deste portal é auxiliar os professores na utilização/adoção da Aprendizagem Baseada em Exemplos durante o ensino de Engenharia de Software.
    </p>
    <p class="text-body1">
      Você pode usar o nosso <a href="#/tutorial-page">tutorial</a> que vai te ajudar a construir um passo a passo para usar exemplos em sala de aula.
    </p>
    <p class="text-body1">
      Você também pode navegar pelo menu e ir direto ao tópico desejado caso já tenha um objetivo em mente.
    </p>
    <q-separator />

    <p class="text-h5 q-mt-md">
      Aprendizagem Baseada em Exemplos
    </p>

    <p class="text-body1">
      A Aprendizagem Baseada em Exemplos é uma das metodologias ativas que podem ser adotadas pelos professores no ensino de Engenharia de Software.
    </p>

    <p class="text-body1">
      Segundo Van Gog (2018), essa metodologia de aprendizado se alicerça na demonstração de como realizar determinada tarefa ou habilidade a ser assimilada. Quando um aluno pode observar um exemplo de uma execução bem sucedida de uma tarefa sua crença em ser capaz de realizar o mesmo feito aumenta (HUANG, 2017).
    </p>
    <p class="text-body1">
      Há várias maneiras de executar as demonstrações nesse processo de aprendizagem. Van Gog e Rummel (2010) citam a utilização de Exemplos Trabalhados (Worked Examples) e Exemplos de Modelagem (Modeling Examples). Com o objetivo de ampliar a visão dos efeitos da utilização de exemplos no processo de aprendizagem, Huang (2017) examinou quatro tipos diferentes de exemplos. Além dos dois já citados, foram examinados Exemplos Trabalhados Errôneos (Erroneous Worked Examples) e Exemplos de Modelagem por Pares (Peer Modeling Examples). A Figura 1 mostra uma classificação dos tipos de exemplos de acordo com a perspectiva pedagógica de cada um deles.
    </p>
    <q-card class="my-card" style="max-width: 800px">
      <img
        src="img/imagem-geral.png"

      >

      <q-card-section>
        <div class="text-h6">Figura 1 - Tipos de exemplos</div>
        <div class="text-subtitle2">Adaptado de Huang (2017)</div>
      </q-card-section>

    </q-card>

    <q-separator class="q-mt-xl"/>

    <p class="text-h5 q-mt-md">
      Referências
    </p>
    <p class="text-body2 text-italic">
      HUANG, X. Example-based learning: Effects of different types of examples on student performance, cognitive load and self-efficacy in a statistical learning task. Interactive Learning Environments, Routledge, v. 25, p. 283–294, 4 2017. ISSN 17445191.
    </p>
    <p class="text-body2 text-italic">
      VAN GOG, T.; RUMMEL, N. Example-based learning: Integrating cognitive and social-cognitive research perspectives. Educational Psychology Review, v. 22, p. 155–174, 2010. ISSN 1040726X.
    </p>
    <p class="text-body2 text-italic">
      VAN GOG, T. Example-based learning. In: International Handbook of the Learning Sciences. Routledge, 2018. Disponível em: <a href="https://www.routledgehandbooks.com/doi/10.4324/9781315617572-20" target="_blank">https://www.routledgehandbooks.com/doi/10.4324/9781315617572-20</a>
    </p>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'

})
</script>
