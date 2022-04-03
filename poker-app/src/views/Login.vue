<template>
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
<div class="login">
  <h2 class="active"> Login </h2>
  <h2 class="nonactive"><router-link to="/register"> Sign up </router-link></h2> 
  <form @submit.prevent="Login">
    <input type="text" class="text" name="E-mail" v-model="email">
    <span>E-mail</span>
    <br>
    <br>
    <input type="password" class="text" name="password" v-model="password">
    <span>password</span>
    <button class="signin" value="Login">
      Sign In
    </button>
  </form>
</div>
</template>

<script>
import {ref} from 'vue';
import firebase from 'firebase';

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase 
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch(err => alert(err.message));
    }

    return {
      Login,
      email,
      password
    }
  }

}
</script>

<style>

body,
.signin {
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
}

.login {
  position: relative;
  height: 560px;
  width: 405px;
  margin: auto;
  padding: 60px 60px;
  background: url(https://images5.alphacoders.com/449/thumb-1920-449376.jpg) no-repeat   center center #505050;   
  background-size: cover;
  box-shadow: 0px 30px 60px -5px #000;
  border-radius: 30px;
}

form {
  padding-top: 80px;
}

.active {
  border-bottom: 2px solid #1161ed;
}

.nonactive {
  color: rgba(255, 255, 255, 0.2);
}

h2 {
  padding-left: 10px;
  padding-right: 10px;
  font-size: 22px;
  text-transform: uppercase;
  padding-bottom: 5px;
  letter-spacing: 1px;
  display: inline-block;
  font-weight: 100;
}

span {
  text-transform: uppercase;
  font-size: 12px;
  opacity: 0.4; 
  display: inline-block;
  position: relative;
  top: -65px;
  transition: all 0.5s ease-in-out;
}

.text {
  border: none;
  width: 89%;
  padding: 10px 20px;
  display: block;
  height: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0);
  overflow: hidden;
  margin-top: 15px;
  transition: all 0.5s ease-in-out;
}

.text:focus {
  outline: 0;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0);
}

input[type="text"],
input[type="password"] {
  font-family: 'Montserrat', sans-serif;
  color: #fff;
}

.signin {
  background-color: #1161ed;
  color: #FFF;
  width: 100%;
  padding: 10px 20px;
  display: block;
  height: 39px;
  border-radius: 20px;
  margin-top: 30px;
  transition: all 0.5s ease-in-out;
  border: none;
  text-transform: uppercase;
}

.signin:hover {
  background: #4082f5;
  box-shadow: 0px 4px 35px -5px #4082f5;
  cursor: pointer;
}

.signin:focus {
  outline: none;
}

a {
  text-align: center;
  display: block;
  top: 120px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.2);
}

</style>