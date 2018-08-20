import { shallowMount } from '@vue/test-utils';
import Vue from 'vue'
import Vuetify from 'vuetify';
import App from "@/App.vue";
import Home from "@/components/Home.vue"
import Editor from "@/components/Editor.vue"

const isnotlogindata = {
    isLogin: false,
    userData: null,
};

const islogindata = {
    isLogin: true,
    userData: null,
};

Vue.use(Vuetify);

describe("App.vue", () => {
    it("ログアウト状態のときはHomeをレンダリング", () => {
    const wrapper = shallowMount(App,);

      wrapper.setData(isnotlogindata);
      console.log(wrapper.html());
      expect(wrapper.find(Home).exists()).toBe(true);
    });
    
    it("ログイン状態のときはEditorをレンダリング", () => {
    const wrapper = shallowMount(App,);

        wrapper.setData(islogindata);
        console.log(wrapper.html());
        expect(wrapper.find(Editor).exists()).toBe(true);
      });
  });