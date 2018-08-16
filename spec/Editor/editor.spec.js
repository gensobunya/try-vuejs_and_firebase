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
    const testmemo = "# test title\n2nd line"
    const testmemo2 = "# test title2\n2nd line_2"

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

        //オペレーション
        wrapper.find(".markdown").setValue(testmemo) //入力
        console.log(wrapper.html())
        
        //記載内容の一致を確認
        expect(wrapper.find(".memoList").exists()).toBe(true)
        expect(wrapper.find(".memoTitle").exists()).toBe(true)
        expect(wrapper.find(".memoTitle").text()).toBe(testmemo.split(/\n/)[0])
        expect(wrapper.find(".preview").html()).toBe('<div class="preview">'+marked(testmemo)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
    })

    it("メモを新しく追加し、新しいメモを表示する", () => {
        const wrapper = shallowMount(Editor,{
            propsData:{user},
            data(){return {data}}
        })
        
        //オペレーション
        wrapper.find(".markdown").setValue(testmemo)
        wrapper.find(".addMemoBtn").trigger("click")//メモ作成ボタン押下
        wrapper.findAll(".memoList").at(1).trigger("click")//メモリストから新しいメモ選択
        wrapper.find(".markdown").setValue(testmemo2)//入力
        console.log(wrapper.html())

        //追加した内容が表示されているか確認
        expect(wrapper.findAll(".memoTitle").at(1).text()).toBe(testmemo2.split(/\n/)[0])
        expect(wrapper.find(".preview").html()).toBe('<div class="preview">'+marked(testmemo2)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
    })

    it("メモを削除する", () => {
        const wrapper = shallowMount(Editor,{
            propsData:{user},
            data(){return {data}}
        })
        
        //オペレーション

        wrapper.find(".markdown").setValue(testmemo)
        wrapper.find(".addMemoBtn").trigger("click")//メモ作成ボタン押下
        wrapper.findAll(".memoList").at(1).trigger("click")//メモリストから新しいメモ選択
        wrapper.find(".markdown").setValue(testmemo2)//入力
        wrapper.findAll(".memoList").at(0).trigger("click")//メモリストから1つめのメモ選択
        wrapper.find(".deleteMemoBtn").trigger("click")//データ削除
        console.log(wrapper.html())

        //2番目のメモが最初に来ているか確認
        expect(wrapper.find(".memoTitle").text()).toBe(testmemo2.split(/\n/)[0])
        expect(wrapper.find(".preview").html()).toBe('<div class="preview">'+marked(testmemo2)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
    })
})