<template>
<v-container align-center grid-list-xl wrap>
    <v-layout column class="header">
        <v-flex class="title">
            <h1>MyMarkdown</h1>
            <v-icon light>account_box</v-icon><span class="displayName">{{ user.displayName }}</span>
            <v-btn small color="info" @click="logout" class="logout">Logout</v-btn>
        </v-flex>
        <v-flex class="buttonWrapper">
            <v-btn fab dark small color="primary" class="addMemoBtn ctlbtn" @click="addMemo">
                <v-icon dark>add</v-icon>
            </v-btn>
            <v-btn fab dark small color="red" class="deleteMemoBtn ctlbtn" @click="deleteMemo" v-if="memos.length > 1" >
                <v-icon dark>delete</v-icon>
            </v-btn>
            <v-btn fab dark small color="info" class="saveMemosBtn ctlbtn" @click="saveMemos">
                <v-icon dark>backup</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <v-layout class="mainarea">
        <v-flex class="sidemenu">
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
        </v-flex>
        <v-flex>
            <v-textarea class="markdown" v-model="memos[selectedIndex].markdown"
                box
                label="MarkdownMemo"
                auto-grow>
            </v-textarea>
        </v-flex>
        <v-flex>
            <v-card light tile>
                <div class="preview" v-html="preview()"></div>
            </v-card>
        </v-flex>
    </v-layout>
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
.mainarea{
    height: 500px;
}

.sidemenu{
    width:5%;
}
.v-list {
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

.preview{
    padding: 1em;
}

.buttonWrapper{
    display: flex;
    margin-bottom: 1em;
}

.ctlbtn {
    display: flex;
    margin: 5px;
}
</style>