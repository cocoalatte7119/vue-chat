<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Create Room"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="New Room"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="name"
                label="Room Name*"
                required
              ></v-text-field>

              <v-file-input
                v-model="fileInput"
                label="File input"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*入力必須項目</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="onSubmit"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click=onSubmit
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signOut, updateProfile } from "firebase/auth"
import { db } from "@/firebase/firebase.js"
import router from "@/router/index.js"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"

const dialog = ref(false)
const name = ref('')
const fileInput = ref(null)

const onSubmit = async () => {
  try {
    let thumbnailUrl = ""

    if (fileInput.value) {
      const file = fileInput.value[0]
      const filePath = `/room/${file.name}`
      console.log("onSubmit", name.value, filePath)
      const storage = getStorage()
      const fileRef = storageRef(storage, filePath)
      await uploadBytes(fileRef, file, { contentType: 'image/jpeg' })

      thumbnailUrl = await getDownloadURL(fileRef)
    }
    
    const roomInfo = await addDoc(collection(db, "rooms"), {
        name: name.value,
        thumbnailUrl: thumbnailUrl,
        createdAt: Timestamp.fromDate(new Date())
    })

    dialog.value = false
    console.log('Room created successfully', roomInfo)
  } 
  catch (error) {
    console.error('Error creating room:', error)
  }
}
</script>
