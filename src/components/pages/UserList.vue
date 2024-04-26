<template>
  <v-app id="inspire">
    <Sidebar />
    <v-app-bar extended>

      <v-app-bar-title>ユーザー一覧</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical">
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
            class="text-center"
          >
          <router-link :to="{ path: '/chat', query: { user_id: n }}">
              <v-avatar color="surface-variant" size="80"></v-avatar>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import Sidebar from "@/components/layouts/Sidebar"
</script>
