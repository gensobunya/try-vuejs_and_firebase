<template>
<div id="app">
 <Home v-if="!isLogin"></Home>
 <Editor v-if="isLogin" :user="userData"></Editor>
</div>
</template>

<script>
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCcNrnMgdYCtnafz2CRMsLIetv7xputbCs",
    authDomain: "mymarkdown-3b8fc.firebaseapp.com",
    databaseURL: "https://mymarkdown-3b8fc.firebaseio.com",
    projectId: "mymarkdown-3b8fc",
    storageBucket: "",
    messagingSenderId: "590689053001"
};
firebase.initializeApp(config);

export default {
 name: 'app',
 data() {
    return {
        isLogin: false,
        userData: null,
    }
 },
 created: function() {
    firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
            this.isLogin = true;
            this.userData = user;
        } else {
            this.isLogin = false;
            this.userData = null;
        };
    });
 },
 components: {
    'Home': Home,
    'Editor': Editor,
 },
}
</script>