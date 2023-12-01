
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
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const currentRouteName = computed(() => router.currentRoute.value.name)
    const isEnglishRoute = computed(() => currentRouteName.value.includes('en'))

    const essentialLinks = computed(() => {
      return [
        {
          title: 'Home',
          caption: '',
          icon: 'home',
          route: { name: isEnglishRoute.value ? 'en-home' : 'home' }
        },
        {
          title: isEnglishRoute.value ? 'Teaching Theory' : 'Ensino da Teoria',
          caption: '',
          icon: 'school',
          route: { name: isEnglishRoute.value ? 'en-teachingTheory' : 'teachingTheory' }
        },
        {
          title: isEnglishRoute.value ? 'Activities' : 'Atividades',
          caption: '',
          icon: 'tips_and_updates',
          route: { name: isEnglishRoute.value ? 'en-activities' : 'activities' }
        },
        {
          title: isEnglishRoute.value ? 'Feedbacks' : 'Feedbacks',
          caption: '',
          icon: 'chat',
          route: { name: isEnglishRoute.value ? 'en-feedbacks' : 'feedbacks' }
        },
        {
          title: isEnglishRoute.value ? 'Repository' : 'Repositório',
          caption: '',
          icon: 'folder',
          route: { name: isEnglishRoute.value ? 'en-repository' : 'repository' }
        }
      ]
    })

    return {
      currentRoute: currentRouteName,
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
