import { shallowMount } from '@vue/test-utils'
import Editor from "@/components/Editor.vue"
import marked from 'marked';

describe("Editor.vue", () => {
    const user = {
        displayName:"test user",
        uid: "testUid0000"
    }
    const data = {
        memos: 
        [{markdown: ''}],
        selectedIndex: 0
    }

    it("継承したユーザー名を表示する", () => {
        
        const wrapper = shallowMount(Editor,{
            propsData: {user}
        })

        expect(wrapper.find("span.displayName").text()).toBe(user.displayName)
    })

    
    it("記入したメモのリスト・タイトル・プレビューを表示する", () => {
        const wrapper = shallowMount(Editor,{
            propsData:{user},
            data(){return {data}}
        })
        const testmemo = "# test title\n2nd line"
        wrapper.find(".markdown").setValue(testmemo)
        data.memos[data.selectedIndex].markdown = testmemo

        console.log(wrapper.html())

        expect(wrapper.find(".memoList").exists()).toBe(true)
        expect(wrapper.find(".memoTitle").exists()).toBe(true)
        expect(wrapper.find(".memoTitle").text()).toBe(data.memos[data.selectedIndex].markdown.split(/\n/)[0])
        expect(wrapper.find(".preview").html()).toBe('<div class="preview">'+marked(testmemo)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
    })
})