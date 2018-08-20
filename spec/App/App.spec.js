import { shallowMount,createLocalVue  } from '@vue/test-utils';
import Vue from 'vue'
import Vuetify from 'vuetify';
import App from "@/App.vue";

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
      expect(wrapper.find("home-stub").exists()).toBe(true);
    });
    
    it("ログイン状態のときはEditorをレンダリング", () => {
    const wrapper = shallowMount(App,);

        wrapper.setData(islogindata);
        console.log(wrapper.html());
        expect(wrapper.find("editor-stub").exists()).toBe(true);
      });
  });