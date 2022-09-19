<template>
  <q-page padding>
    <TabOptions/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TabOptions from '../components/TabOptions.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { TabOptions }
})
</script>
