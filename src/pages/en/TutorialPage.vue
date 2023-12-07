<template>
  <q-page padding>
    <TabOptions/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TabOptions from 'src/components/TabOptionsEn.vue'

export default defineComponent({
  name: 'TutorialPage',
  components: { TabOptions }
})
</script>
