import { shallowMount } from '@vue/test-utils'
import App from "@/App.vue"
import Editor from "@/components/Editor.vue"
import Home from "@/components/Home.vue"
 
  describe("App.vue", () => {
    it("ログアウト状態のときはHomeをレンダリング", () => {
      const wrapper = shallowMount(App,{
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
        const wrapper = shallowMount(App,{
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