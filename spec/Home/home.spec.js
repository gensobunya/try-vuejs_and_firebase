import { mount } from 'avoriaz';
import Vue from 'vue'
import Vuetify from 'vuetify';
import Home from "@/components/Home.vue";
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

Vue.use(Vuetify);

describe("Home.vue", () => {
  it("ログインボタンをレンダリングする", () => {
    const wrapper = mount(Home);
    
    console.log(wrapper.html());
    expect(wrapper.find(".login").exists()).toBe(true);
  });
});