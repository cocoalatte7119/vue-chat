<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" style="width: 50%">
      <v-card-title class="text-center">
          SignUp
        </v-card-title>
        <v-card-subtitle  class="text-center mb-4">
          ユーザー情報を入力ください
        </v-card-subtitle>
        <v-btn class="mx-auto mb-4" variant="text" block color="light-blue" to="login" style="width: 50%">ログイン画面はこちら</v-btn>
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
      <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="nameRules"
          class="mb-2"
          clearable
          label="UserName"
        ></v-text-field>

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
          @click="submit"
        >
          SIGN UP
        </v-btn>

        <v-btn 
          class="mt-4"
          block
        >
          CLEAR
        </v-btn>
        <v-alert
          class="mt-6"
          density="compact"
          type="error"
          v-if="errorMessage"
          title="ユーザーの新規作成に失敗しました"
        >
        {{ errorMessage }}
      </v-alert>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/firebase/firebase.js"
import router from "@/router/index.js"

const form = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const nameRules = [
  v => !!v || '名前を入力してください',
  v => (v && v.length <= 10) || '名前は10文字以内で入力してください'
]
const emailRules = [
  v => !!v || 'メールアドレスを入力してください',
  v => (/.+@.+\..+/.test(v)) || 'メールアドレスが不正です'
]
const passwordRules = [
  v => !!v || 'パスワードを入力してください',
  v => (v && v.length > 6) || 'パスワードは7文字以上で入力してください'
]

const onSubmit = () => {
  if (!form.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}

const submit = () => {
  console.log("submit call")
  console.log("name", name.value)
  console.log("email", email.value)
  console.log("password", password.value)
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user
      await updateProfile(user, {displayName: name.value})
      localStorage.message="新規作成に成功しました"
      router.push({name: "Login"})
    })
    .catch((error) => {
      console.log("error", error)
      errorMessage.value = "このメールアドレスは既に登録されています"
    })
}
</script>