import { mount } from 'avoriaz';
import Vue from 'vue'
import Vuetify from 'vuetify';
import App from "@/App.vue";
// import Home from "@/components/Home.vue"
// import Editor from "@/components/Editor.vue"

const isnotlogindata = {
    isLogin: false,
    userData: null,
};

const islogindata = {
    isLogin: true,
    userData: {
        displayName: "test user",
        uid: "testuid",
    },
};

Vue.use(Vuetify);

describe("App.vue", () => {
    it("ログアウト状態のときはHomeをレンダリング", () => {
        const wrapper = mount(App,{
           data: () => {
                return isnotlogindata
            }
        });

        console.log(wrapper.data().isLogin);
        console.log(wrapper.html());
        expect(wrapper.first("#home").is("#home")).toBe(true);
    });
    
    it("ログイン状態のときはEditorをレンダリング", () => {
        const wrapper = mount(App,{
           data: () => {
            return islogindata
            }
        });
        
        console.log(wrapper.data().isLogin);
        console.log(wrapper.html());
        expect(wrapper.first("#editor").is("#editor")).toBe(true);
    });
  });