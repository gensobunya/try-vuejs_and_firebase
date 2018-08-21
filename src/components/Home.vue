<template>
 <v-container id="home">
    <h1>{{ msg }}</h1>
    <v-btn color="info" @click="googleLogin" class="login">Google アカウントでログイン</v-btn>
 </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
 name: 'home',
 data () {
     return {
     msg: 'Welcome to MyMarkdown'
     }
 },
 methods: {
    googleLogin: function() {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
 }
}
</script>