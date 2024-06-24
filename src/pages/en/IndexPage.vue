<template>
  <q-page padding>

    <p class="text-h5">
      Welcome!
    </p>
    <p class="text-body1">
      The purpose of this portal is to assist teachers in the use/adoption of Example-Based Learning during the teaching of Software Engineering.
    </p>
    <p class="text-body1">
      You can use our <RouterLink to="tutorial-page">tutorial</RouterLink>, which will help you build a step-by-step guide for incorporating examples in the classroom.
    </p>
    <p class="text-body1">
      You can also navigate through the menu and go directly to the desired topic if you already have a specific goal in mind.
    </p>
    <q-separator />

    <p class="text-h5 q-mt-md">
      Example-Based Learning
    </p>

    <p class="text-body1">
      Example-Based Learning is one of the active methodologies that can be adopted by teachers in the teaching of Software Engineering.
    </p>

    <p class="text-body1">
      According to Van Gog (2018), this learning methodology is based on the demonstration of how to perform a certain task or skill to be assimilated. When a student can observe an example of a successful execution of a task, their belief in being able to perform the same feat increases (HUANG, 2017).
    </p>
    <p class="text-body1">
      There are several ways to perform demonstrations in this learning process. Van Gog and Rummel (2010) mention the use of Worked Examples and Modeling Examples. With the aim of expanding the vision of the effects of the use of examples in the learning process, Huang (2017) examined four different types of examples. In addition to the two already mentioned, Erroneous Worked Examples and Peer Modeling Examples were examined. Figure 1 shows a classification of the types of examples according to the pedagogical perspective of each one.
    </p>
    <q-card class="my-card" style="max-width: 800px">
      <img
        src="img/Diagrama-Exemplos[trad].png"
      >

      <q-card-section>
        <div class="text-h6">Figure 1 - Types of examples</div>
        <div class="text-subtitle2">Adapted from Huang (2017)</div>
      </q-card-section>

    </q-card>

    <q-separator class="q-mt-xl"/>

    <p class="text-h5 q-mt-md">
      References
    </p>
    <p class="text-body2 text-italic">
      HUANG, X. Example-based learning: Effects of different types of examples on student performance, cognitive load and self-efficacy in a statistical learning task. Interactive Learning Environments, Routledge, v. 25, p. 283–294, 4 2017. ISSN 17445191.
    </p>
    <p class="text-body2 text-italic">
      VAN GOG, T.; RUMMEL, N. Example-based learning: Integrating cognitive and social-cognitive research perspectives. Educational Psychology Review, v. 22, p. 155–174, 2010. ISSN 1040726X.
    </p>
    <p class="text-body2 text-italic">
      VAN GOG, T. Example-based learning. In: International Handbook of the Learning Sciences. Routledge, 2018. Available at: <a href="https://www.routledgehandbooks.com/doi/10.4324/9781315617572-20" target="_blank">https://www.routledgehandbooks.com/doi/10.4324/9781315617572-20</a>
    </p>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
