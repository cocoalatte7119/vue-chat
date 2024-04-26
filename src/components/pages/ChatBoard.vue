<template>
  <v-app id="inspire">
    <Sidebar />
    <v-main>
      <h1 class="my-10 text-center">{{ room? room.name : "" }}</h1>
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

                <template v-for="(data, index) in messages" :key="index">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="info">
                        <v-img :src="data.photoURL" v-if="data.photoURL"></v-img>
                        <v-icon v-if="!data.photoURL">mdi-account-circle</v-icon>
                      </v-avatar>
                    </template>

                    <v-list-item-text class="message">
                      <template v-if="isUrl(data.message)">
                        <a :href="data.message" target="_blank">{{ data.message }}</a>
                      </template>
                      <template v-else>
                        {{ data.message }}
                      </template>
                    </v-list-item-text>
                  </v-list-item>

                  <v-divider
                    v-if="index !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="body"
            append-icon="mdi-send"
            clear-icon="mdi-close-circle"
            label="メッセージを入力する"
            type="text"
            variant="filled"
            clearable
            :append-icon-cb="invalid"
            @click:append="submit"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
      </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { collection, getDoc, getDocs, doc, orderBy, query, Timestamp, addDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/firebase.js'
import Sidebar from "@/components/layouts/Sidebar"
import { useRoute } from 'vue-router'
import router from "@/router/index.js"

const route = useRoute()
const messages = ref([])
const body = ref('')
const roomId = ref(route.query.room_id)
const room = ref(null)
const cards = ref(['Today'])
const auth = ref(null)

const invalid = computed(() => !body.value)

const clearMessage = () => {
  body.value = ''
}

const isUrl = (str) => {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
  return pattern.test(str);
}

const submit = () => {
  try{
    if(body.value !== ""){
      const roomIdGet = roomId.value
      const roomRef = doc(db, "rooms", roomIdGet)
      const roomChat = addDoc(collection(roomRef, "messages"), {
        message: body.value,
        name: auth.value.displayName,
        photoURL: auth.value.photoUrl,
        createdAt: Timestamp.fromDate(new Date())
      })
      body.value = ""
    }
  }
  catch(error){
    alert("メッセージの送信に失敗しました")
  }
}

onMounted(async () => {
  auth.value  = JSON.parse(sessionStorage.getItem('user'))

  const roomIdGet = roomId.value
  const roomRef = doc(db, "rooms", roomIdGet)
  const roomDoc = await getDoc(roomRef)
  if(!roomDoc.exists()){
    await router.push("/")
  } 
  room.value = roomDoc.data()

const subCollectionRef = collection(roomRef, "messages")
const subCollectionQuery = query(subCollectionRef, orderBy("createdAt", "asc"))

const unsub = onSnapshot(subCollectionQuery, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      console.log("newMessage", change.doc.data())
      messages.value.push(change.doc.data())
    })
})
})
</script>