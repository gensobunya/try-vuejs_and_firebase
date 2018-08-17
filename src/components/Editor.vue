<template>
<v-container>
<div class="editor">
 <h1> エディター画面</h1>
 <span class="displayName">{{ user.displayName }}</span>
 <v-btn small color="info" @click="logout" class="logout">Logout</v-btn>
    <div>

        <v-layout row class="memoListWrapper">
            <v-list>
            <template v-for="(memo, index) in memos">
                <v-list-tile class="memoList" v-bind:key="index" @click="selectMemo(index)" :data-selected="index == selectedIndex">
                    <v-list-tile-content>
                        <v-list-tile-title class="memoTitle">{{ displayTitle(memo.markdown) }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < memos.length" :key="index"></v-divider>
            </template>
            </v-list>

            <div class="buttonWrapper">
                <v-btn fab dark small color="primary" class="addMemoBtn" @click="addMemo">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" class="deleteMemoBtn" @click="deleteMemo" v-if="memos.length > 1" >
                    <v-icon dark>delete</v-icon>
                </v-btn>
                <v-btn fab dark small color="info" class="saveMemosBtn" @click="saveMemos">
                    <v-icon dark>backup</v-icon>
                </v-btn>
            </div>
        </v-layout>
        <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
        <div class="preview" v-html="preview()"></div>
    </div>
</div>
</v-container>
</template>
<script>
import marked from 'marked';
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
    name: 'editor',
    props: ['user'],
    data() {
        return {
            memos: [{
                markdown: ''
            }],
            selectedIndex: 0
        }
    },
    created: function() {
        firebase.database().ref('memos/' + this.user.uid).once('value').then(result => {
            if (result.val()) {
                this.memos = result.val();
            }
        })
    },
    methods: {
        logout: function() {
            firebase.auth().signOut();
        },
        addMemo: function() {
            this.memos.push({
                markdown: '無題のメモ',
            })
        },
        selectMemo: function(index) {
          this.selectedIndex = index;
        },
        preview: function() {
          return marked(this.memos[this.selectedIndex].markdown);
        },
        displayTitle: function(text) {
            return text.split(/\n/)[0];
        },
        deleteMemo: function() {
            this.memos.splice(this.selectedIndex, 1);
            if (this.selectedIndex > 0) {
            this.selectedIndex--;
            }
        },
        saveMemos: function() {
            firebase.database().ref('memos/' + this.user.uid).set(this.memos);
        },
    }
}
</script>
<style lang="scss" scoped>
.memoListWrapper {
 width: 19%;
 float: left;
 border-top: 1px solid #000;
}
.memoList {
 padding: 10px;
 box-sizing: border-box;
 text-align: left;
 border-bottom: 1px solid #000;
 &:nth-child(even) {
 background-color: #ccc;
 }
 &[data-selected="true"] {
 background-color: #ccf;
 }
}

.memoTitle {
 height: 1.5em;
 margin: 0;
 white-space: nowrap;
 overflow: hidden;
}
.addMemoBtn {
 margin-top: 20px;
}
.markdown {
 float: left;
 width: 40%;
 height: 500px;
}
.preview {
 float: left;
 width: 40%;
 text-align: left;
}
.deleteMemoBtn {
 margin: 10px;
}
</style>