<script setup>
  import { onMounted, ref } from 'vue';
  import { useMessageStore } from './stores/messageStore'
  import { useDisplay } from 'vuetify'
  import UserSearch from './components/UserSearch.vue'
  import QuickScan from "./components/QuickScan.vue"
  import FlashMessage from "./components/FlashMessage.vue"

  let messageStore = useMessageStore()
  let drawer = ref(false)
  let darkMode = ref(true);
  const { xs } = useDisplay()
  let showUserSearch = ref(false)
  let sheetLink = ref("")

  function onEnter(id){
    google.script.run.withSuccessHandler(messageStore.add).withFailureHandler(messageStore.add).add(id)
  }

  onMounted(_=> {
    google.script.run.withSuccessHandler(e=>sheetLink.value=e).withFailureHandler(messageStore.add).getSheetUrl()
  })

</script>

<template>
  <v-theme-provider :theme="darkMode ? 'dark' : 'light'">
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar app :collapse="xs ? true : false">
          <v-app-bar-nav-icon v-if="xs" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-btn @click="showUserSearch = true">
            <v-icon size="x-large">mdi-account-search</v-icon>
            Search By Name
          </v-btn>

          <v-btn @click="_=> darkMode = !darkMode">
            <v-icon size="x-large">mdi-brightness-4</v-icon>
            <span v-if="darkMode">Light Mode</span>
            <span v-else>Dark Mode</span>
          </v-btn>

          <v-btn v-if="sheetLink !== ''" :href="sheetLink" target="_blank">
            <v-icon size="x-large">mdi-clipboard-account-outline</v-icon>
            View List
          </v-btn>

        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          location="bottom"
          temporary
          >

          <v-btn class="w-100  my-2" @click="_=> showUserSearch = true">
            <v-icon size="x-large">mdi-account-search</v-icon>
            Quick Search
          </v-btn>
          <v-btn class="w-100 my-2" @click="_=> darkMode = !darkMode">
            <v-icon size="x-large"></v-icon>
            <span v-if="darkMode">Light Mode</span>
            <span v-else>Dark Mode</span>
          </v-btn>
          <v-btn v-if="sheetLink !== ''" :href="sheetLink" target="_blank">
            <v-icon size="x-large">mdi-clipboard-account-outline</v-icon>
            View List
          </v-btn>

        </v-navigation-drawer>
        
        <v-dialog
          v-model="showUserSearch"
          width="w-100"
        >
          <v-card>
            <v-card-actions>
              <v-icon color="secondary">mdi-account-search</v-icon>
              <v-spacer></v-spacer>
              <v-btn @click="showUserSearch = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
            <UserSearch :onSubmit="id=> {showUserSearch = false; onEnter(id)}" />
          </v-card>
        </v-dialog>
        
        <QuickScan :onEnter="onEnter" />
        <FlashMessage />
      </v-container>
    </v-main>
  </v-app>
</v-theme-provider>
</template>

<style scoped>
  a:visited {
    color: inherit;
  }

</style>
