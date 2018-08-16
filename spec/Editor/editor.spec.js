import { shallowMount } from '@vue/test-utils'
import Editor from "@/components/Editor.vue"

describe("Editor.vue", () => {
    it("継承したユーザー名を表示する", () => {
        const user = {
            displayName:"test user",
            uid: "testUid0000"
        }
        const wrapper = shallowMount(Editor,{
            propsData: {user}
        })

        console.log(wrapper.html())
        expect(wrapper.find("span.displayName").text()).toBe(user.displayName)
    })
})