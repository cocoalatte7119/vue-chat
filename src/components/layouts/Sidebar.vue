<template>
      <v-navigation-drawer v-model="drawer">
        <v-sheet
          color="grey-lighten-4"
          class="pa-4 text-center"
        >
          <v-avatar
            class="mb-2"
            color="info"
            size="64"
          >
          <input 
            type="file" 
            class="d-none" 
            accept="image/jpg, image/jpeg, image/png"
            ref="fileInput"
            @change="updateIcon"
          >
          <v-icon @click="changeIcon" v-if="!photoUrl">mdi-account-circle</v-icon>

          <img @click="changeIcon" :src="photoUrl" v-if="photoUrl" class="w-100">
        </v-avatar>
  
          <div class="username">{{ userName && userName.displayName }}</div>
        </v-sheet>
  
        <v-divider></v-divider>
  
        <v-list>

          <v-list-item
            v-for="[icon, text, to] in links"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            :to="to"
            link
          >
        </v-list-item>
        </v-list>
        <v-list>
          <v-list-item
            v-for="[icon, text] in userSet"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            @click="logout"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { signOut, updateProfile } from "firebase/auth"
  import { auth } from "@/firebase/firebase.js"
  import router from "@/router/index.js"
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

  const links = [
    ['mdi-inbox-arrow-down', 'Inbox','/'],
    ['mdi-send', 'Send','/login'],
    ['mdi-delete', 'Trash','/login'],
    ['mdi-alert-octagon', 'Spam','/login'],
  ]

  const userSet = [
    ['mdi-logout', 'Logout']
  ]

  const userName = ref("")

  const photoUrl = ref("")

  const fileInput = ref(null)

  const logout = () => {
    signOut(auth)
    .then(() => {
        localStorage.message="ログアウトに成功しました"
        router.push({name: "Login"})
      })
    .catch((error) => {
        console.log(error)
      })
  }

  onMounted(() => {
    userName.value = JSON.parse(sessionStorage.getItem('user'))
    photoUrl.value = JSON.parse(sessionStorage.getItem('photoURL'))
  })

  const changeIcon = () => {
    fileInput.value.click()
  }

  const updateIcon = async () => {
    const user = auth.currentUser
    if (!user) {
      sessionStorage.removeItem('user')
      router.push({ name: 'Login' })
      return
    }

    const file = fileInput.value.files[0]
    const filePath = `/user/${file.name}`
    const storage = getStorage()
    try {
      const snapshot = await uploadBytes(storageRef(storage, filePath), file)
      const newPhotoUrl = await getDownloadURL(storageRef(storage, filePath))

      if (user) {
        await updateProfile(user, { "photoURL": newPhotoUrl })
        photoUrl.value = newPhotoUrl
        sessionStorage.setItem('photoURL', JSON.stringify(newPhotoUrl))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const drawer = ref(null)
</script>