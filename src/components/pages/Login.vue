<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" style="width: 50%">
      <v-card-title class="text-center">
          Login
        </v-card-title>
        <v-card-subtitle  class="text-center mb-4">
          ユーザー情報を入力ください
        </v-card-subtitle>
        <v-btn class="mx-auto mb-4" variant="text" block color="light-blue" to="signup" style="width: 50%">新規登録はこちら</v-btn>
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="emailRules"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="passwordRules"
          clearable
          label="Password"
          type="password"
          placeholder="Enter your password"
        ></v-text-field>

        <v-btn
          class="mt-4"
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          @click="login"
        >
          LOGIN
        </v-btn>

        <v-btn 
          class="mt-4"
          block
        >
          CLEAR
        </v-btn>
        <v-alert
          class="mt-6"
          type="success"
          v-if="message"
        >
        {{ message }}
      </v-alert>
      <v-alert
          class="mt-6"
          density="compact"
          type="error"
          v-if="errorMessage"
        >
        {{ errorMessage }}
      </v-alert>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { signInWithEmailAndPassword } from "firebase/auth"
  import { auth } from "@/firebase/firebase.js"
  import router from "@/router/index.js"

  const form = ref(false)
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const message = ref('')
  const errorMessage = ref('')

  const emailRules = [
  v => !!v || 'メールアドレスを入力してください',
  v => (/.+@.+\..+/.test(v)) || 'メールアドレスが不正です'
]

  const passwordRules = [
    v => !!v || 'パスワードを入力してください',
  ]

  function onSubmit () {
    if (!form.value) return
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user

      const userStorage = {
        displayName : userCredential.user.displayName,
        email : userCredential.user.email,
        uid : userCredential.user.uid,
        refreshToken : userCredential.user.refreshToken,
        photoUrl: userCredential.user.photoURL
      }

      sessionStorage.setItem('user', JSON.stringify(userStorage))

      router.push({name: "RoomList"})
    })
    .catch((error) => {
      console.log("error", error)
      errorMessage.value = "ログインに失敗しました"
    })
  }

  onMounted (()=>{
    if(localStorage.message) {
      message.value = localStorage.message
      localStorage.message = ''
    }
  })
</script>
