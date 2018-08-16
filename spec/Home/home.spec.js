import { shallowMount } from '@vue/test-utils'
import Home from "@/components/Home.vue"
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

describe("Home.vue", () => {
  it("ログインボタンをレンダリングする", () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.find("button.login").exists()).toBe(true)
  })
})