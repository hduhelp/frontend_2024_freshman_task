<script setup>
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { useLocale, useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

const { current } = useLocale()
const { t } = useI18n()

const languageItems = [
  { text: '中文', value: 'zhHans' },
  { text: 'English', value: 'en' }
]

const i18nSelect = ref(false)

function changeLocale(locale) {
  current.value = locale
}

const links = computed(() => [
  { name: t('home'), path: '/home', icon: 'mdi-home-outline' },
  { name: t('ask'), path: '/ask', icon: 'mdi-bell-outline' }
])

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-app id="inspire">
    <v-app-bar class="px-3" density="comfortable">
      <v-app-bar-title>{{ $t('qaPlatform') }}</v-app-bar-title>
      <v-btn @click="toggleTheme" icon><v-icon>mdi-theme-light-dark</v-icon></v-btn>

      <div class="menu-wrapper">
        <v-menu v-model="i18nSelect" activator="parent" offset-y>
          <template v-slot:activator="{ attrs }">
            <v-btn v-bind="attrs" icon>
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>

          <v-list width="100px">
            <v-list-item
              v-for="(item, index) in languageItems"
              :key="index"
              @click="changeLocale(item.value)"
            >
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn-group>
        <v-btn
          v-for="link in links"
          :key="link.name"
          :prepend-icon="link.icon"
          text
          @click="$router.push(link.path)"
        >
          {{ link.name }}
        </v-btn>
      </v-btn-group>
    </v-app-bar>

    <v-main>
      <!-- Where Views Insert -->
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<style scoped></style>
