<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-list lines="two">
                <v-list-subheader :title="card"></v-list-subheader>

                <template v-for="n in 6" :key="n">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>

                    <v-list-item-title :title="`Message ${n}`"></v-list-item-title>

                    <text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique</text>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam'],
  ]

  const drawer = ref(null)
</script>