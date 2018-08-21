import { mount } from 'avoriaz';
import Vue from 'vue'
import Vuetify from 'vuetify';
import Editor from "@/components/Editor.vue";
import marked from 'marked';

Vue.use(Vuetify);

describe("Editor.vue", () => {
    //Start Test data
    const user = {
        displayName:"test user",
        uid: "testUid0000"
    };
    const data = {
        memos: 
        [{markdown: ''}],
        selectedIndex: 0
    };
    const testmemo = "# test title\n2nd line";
    const testmemo2 = "# test title2\n2nd line_2";
    //End Test data

    it("継承したユーザー名を表示する", () => {
        
        const wrapper = mount(Editor,{
            propsData: {user},
            data: () => {
                return data
            }
        });

        expect(wrapper.first("span.displayName").text()).toBe(user.displayName);
    });

    
    it("記入したメモのリスト・タイトル・プレビューを表示する", () => {
        const wrapper = mount(Editor,{
            propsData:{user},
        });

        //オペレーション
        wrapper.first("#markdown").element.value = testmemo;
        wrapper.first("#markdown").trigger('input');
        console.log(wrapper.html());
        //記載内容の一致を確認
        expect(wrapper.first(".memoList").is(".memoList")).toBe(true);
        expect(wrapper.first(".memoTitle").is(".memoTitle")).toBe(true);
        expect(wrapper.vm.displayTitle(testmemo)).toBe("# test title");
        expect(wrapper.vm.preview()).toBe(marked('<h1 id="test-title">test title</h1>\n<p>2nd line</p>\n'));

    });

    //以下未テスト

    // it("メモを新しく追加する", () => {
    //     const wrapper = mount(Editor,{
    //         propsData:{user},
    //     });
    //     //オペレーション
    //     wrapper.first("#markdown").element.value = testmemo;
    //     wrapper.first("#markdown").trigger('input');
    //     wrapper.first(".addMemoBtn").trigger("click");
    //     wrapper.find(".memoList")[1].trigger("click");//メモリストから新しいメモ選択
    //     wrapper.first("#markdown").element.value = testmemo2;
    //     wrapper.first("#markdown").trigger('change');//入力
    //     console.log(wrapper.html());

    //     //追加した内容が表示されているか確認
    //     expect(wrapper.find(".memoList")[1].text()).toBe(testmemo2.split(/\n/)[0]);
    //     expect(wrapper.first(".preview").html()).toBe('<div class="preview">'+marked(testmemo2)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
    // });

    // it("メモを削除する", () => {
    //     const wrapper = mount(Editor,{
    //         propsData:{user},
    //     });

    //     //オペレーション

    //     wrapper.first("#markdown").element.value = testmemo;
    //     wrapper.first("#markdown").trigger('input');
    //     wrapper.first(".addMemoBtn").trigger("click");//メモ作成ボタン押下
    //     wrapper.find(".memoList")[1].trigger("click");//メモリストから新しいメモ選択
    //     wrapper.first("#markdown").element.value = testmemo2;
    //     wrapper.first("#markdown").trigger('input');
    //     wrapper.find(".memoList")[0].trigger("click");//メモリストから1つめのメモ選択
    //     wrapper.first(".deleteMemoBtn").trigger("click");//データ削除
    //     console.log(wrapper.html());

    //     //2番目のメモが最初に来ているか確認
    //     expect(wrapper.first(".memoTitle").text()).toBe(testmemo2.split(/\n/)[0]);
    //     expect(wrapper.first(".preview").html()).toBe('<div class="preview">'+marked(testmemo2)+'</div>') //markdownをHTMLにレンダリングしたものとレンダリングされたHTMLを比較したいけどDOM抽出した際のdivタグが邪魔
  
    });
});