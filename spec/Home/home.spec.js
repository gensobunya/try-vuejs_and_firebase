import { shallowMount } from '@vue/test-utils'
import Home from "@/components/Home.vue"

describe("Home.vue", () => {
  it("ログインボタンをレンダリングする", () => {
    const wrapper = shallowMount(Home)

    expect(wrapper.find("button.login").exists()).toBe(true)
  })
})