<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>

import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase/app';

export default {

    data: () => ({
    isLoggedIn: false
  }),

  setup(){
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace('/');
        }
      });
    });
  }

}
</script>

<style>
  @import './style.css';
</style>
