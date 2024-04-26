<template>
  <v-app id="inspire">
    <Sidebar />
    <v-app-bar extended>
      <v-app-bar-title>ルーム一覧</v-app-bar-title>
      <CreateRoom />
      <v-spacer></v-spacer>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4" class="text-center">
            <router-link :to="{ path: '/chat', query: { room_id: room.id }}">
              <v-avatar color="surface-variant" size="80">
                <v-img
                  alt="John"
                  :src="room.thumbnailUrl || 'https://cdn.vuetifyjs.com/images/john.jpg'"
                ></v-img>
              </v-avatar>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import Sidebar from "@/components/layouts/Sidebar"
  import CreateRoom from "@/components/module/CreateRoom"
  import { collection, getDocs, orderBy, query } from 'firebase/firestore'
  import { db } from '@/firebase/firebase.js'

  const rooms = ref([])

  const getRooms = async () => {
    rooms.value = []
    const roomRef = collection(db, "rooms")
    const roomQuery = query(roomRef, orderBy("createdAt", "asc"))
    const querySnapshot = await getDocs(roomQuery)

    querySnapshot.forEach((doc) => {
      const data = {...doc.data()}
      data.id = doc.id
      rooms.value.push(data)
    })

  }

  onMounted(getRooms)
</script>
