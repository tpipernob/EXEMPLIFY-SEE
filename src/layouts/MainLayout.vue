<template>
  <q-layout view="hHh Lpr lFf" class="bg-grey-1">
    <q-header elevated class="print-hide q-py-xs" height-hint="58">
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> {{titulo}} </q-toolbar-title>

<!--        <q-btn-->
<!--          flat-->
<!--          dense-->
<!--          round-->
<!--          icon="exit_to_app"-->
<!--          aria-label="Logout"-->
<!--          @click="handleLogout">-->
<!--          &nbsp;Logout-->
<!--        </q-btn>-->
        <q-btn flat no-wrap>
          <q-avatar size="30px" icon="person">
          </q-avatar>
          <q-icon name="arrow_drop_down" size="20px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <div><strong>Tiago Piperno Bonetti</strong></div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link">
                <q-item-section>Perfil</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Meus exemplos</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Minhas avaliações</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Exemplos favoritos</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link">
                <q-item-section @click="handleLogout">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-blue-grey-2"
      :width="240"
    >
      <q-list padding>

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
          title: isEnglishRoute.value ? 'Versão em Português' : 'English Version',
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
