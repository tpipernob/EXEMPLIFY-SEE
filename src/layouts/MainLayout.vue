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
        <q-toolbar-title> {{titulo}} </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="exit_to_app"
          aria-label="Logout"
          @click="handleLogout">
          &nbsp;Logout
        </q-btn>

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
import { signOut } from 'src/firebase/firebase-login'

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
          title: isEnglishRoute.value ? 'Tutorial' : 'Tutorial',
          caption: '',
          icon: 'explore',
          route: { name: isEnglishRoute.value ? 'en-tutorial' : 'tutorial' }
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
        },
        {
          title: isEnglishRoute.value ? 'Versão em Português' : 'Versão em Inglês',
          caption: '',
          icon: 'info',
          route: { name: isEnglishRoute.value ? 'home' : 'en-home' }
        }
      ]
    })

    const titulo = computed(() => isEnglishRoute.value ? 'EXEMPLIFY-SEE Portal' : 'Portal EXEMPLIFY-SEE')

    return {
      currentRoute: currentRouteName,
      essentialLinks,
      leftDrawerOpen,
      titulo,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    async handleLogout () {
      try {
        await signOut()
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
