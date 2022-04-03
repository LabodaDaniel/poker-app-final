<template>
<nav class="navbar">
  <ul>
    <li class="stand"><router-link to="/" class="must">Home</router-link></li>
    <li class="stand"><router-link to="/simulategame" class="must">Simulate Game</router-link></li>
    <li @click="Logout" class="log"><router-link to="/login" class="must">Logout</router-link></li>
  </ul>
</nav>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {

  data: () => ({
    nickname: ""
  }),

  methods: {
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed Out"))
        .catch(err => alert(err.message));
    },

    async Nickname() {
      let snapshot = await db.collection("users").get()
      let currentUser = firebase.auth().currentUser;
      snapshot.docs.forEach(user => {
        if (user.id === currentUser.uid) {
          this.nickname = user.data().nickname;
        }
      });
    },
  },
  mounted() {
    this.Nickname()
  }

}
</script>
<style scoped>
.stand {
  background-image: linear-gradient(40deg,#4082f5,#6272fc);
}

.stand:hover {
  background-image: linear-gradient(30deg,#030557,#6272fc);
    box-shadow: #030557 0px 25px 35px -13px;
}

.log {
  background-image: linear-gradient(40deg, #e35b5a,#e63b3b);
}

.log:hover {
  background-image: linear-gradient(30deg,#8d0202,#e35b5a);
  box-shadow: #8d0202 0px 25px 35px -13px;
}

.must {
  text-decoration: none;
}

.navbar > ul > li{
  list-style:none;
  margin: 0px;
  padding: 10px 20px;
  font-size: 1.4rem;
  font-family:bolder;
  color:#ffff;
  border-radius:20px;
  transform: scale(0.8);
  transition: all .2s ease-out;
  text-transform: uppercase;
}
ul{
  display:flex;
  justify-content: center;
}

.navbar > ul > li:hover{
  font-size: 1.4rem;
  transform: scale(0.9);
  transition-duration: 1s ease-out;
  border-radius:15px;
  color:#ffffeb;
  border:0.1px  black;
  -webkit-tap-highlight-color: transparent;
  animation-play-state: paused;
}
</style>
