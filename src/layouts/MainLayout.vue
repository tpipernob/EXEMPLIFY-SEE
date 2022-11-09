<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="print-hide">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Aprendizagem Baseada em Exemplos </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' }
  },
  {
    title: 'Tutorial',
    caption: '',
    icon: 'explore',
    route: { name: 'tutorial' }
  },
  {
    title: 'Ensino da Teoria',
    caption: '',
    icon: 'school',
    route: { name: 'teachingTheory' }
  },
  {
    title: 'Atividades',
    caption: '',
    icon: 'tips_and_updates',
    route: { name: 'activities' }
  },
  {
    title: 'Feedback',
    caption: '',
    icon: 'chat',
    link: ''
  },
  {
    title: 'Repositório de Exemplos',
    caption: '',
    icon: 'folder',
    route: { name: 'repository' }
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
