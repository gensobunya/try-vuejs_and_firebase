<template id="app">
    <v-app>
        <v-content>
            <Home v-if="!isLogin"></Home>
            <Editor v-if="isLogin" :user="userData"></Editor>
        </v-content>
    </v-app>
</template>

<script>
import Home from './components/Home.vue';
import Editor from './components/Editor.vue';
import firebase from 'firebase';

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
