import { shallowMount,createLocalVue  } from '@vue/test-utils'
import Vuetify from 'vuetify'
import App from "@/App.vue"
import Editor from "@/components/Editor.vue"
import Home from "@/components/Home.vue"

describe("App.vue", () => {
    it("ログアウト状態のときはHomeをレンダリング", () => {
    // Vueインスタンスを別で作成する
    const localVue = createLocalVue()
    // そのVueインスタンスにVuetifyを取り込む
    localVue.use(Vuetify)

    const wrapper = shallowMount(App,{
        localVue,
        data() {
            return {
                isLogin: false,
                userData: null,
            }
        }
      })
      console.log(wrapper.html())
      expect(wrapper.find(Home).exists()).toBe(true)
    })
    it("ログイン状態のときはEditorをレンダリング", () => {
    // Vueインスタンスを別で作成する
    const localVue = createLocalVue()
    // そのVueインスタンスにVuetifyを取り込む
    localVue.use(Vuetify)

    const wrapper = shallowMount(App,{
        localVue,
        data() {
            return {
                isLogin: true,
                userData: null,
              }
          }
        })
        console.log(wrapper.html())    
        expect(wrapper.find(Editor).exists()).toBe(true)
      })
  })