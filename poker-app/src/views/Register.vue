<template>
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat"
    rel="stylesheet"
    type="text/css"
  />
  <div class="login">
    <h2 class="nonactive"><router-link to="/login"> Login </router-link></h2>

    <h2 class="active">sign up</h2>
    <form @submit.prevent="Register">
      <input type="text" class="text" name="Nickname" v-model="nickname" />
      <span>Nickname</span>

      <br />

      <input type="text" class="text" name="E-mail" v-model="email" />
      <span>E-mail</span>

      <br />

      <br />

      <input type="password" class="text" name="password" v-model="password" />
      <span>password</span>

      <button class="signin" value="Login">Sign Up</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { ref } from "vue";
import { db } from "../main";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const nickname = ref("");

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
          db.collection("users")
            .doc(user.uid)
            .set({nickname: nickname.value})
        })
        .catch((err) => alert(err.message));
    };

    return {
      Register,
      email,
      password,
      nickname,
    };
  },
};
</script>

<style>
</style>