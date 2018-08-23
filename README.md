# mymarkdown

> A Vue.js project

This is a tutorial in [nabettu](https://github.com/nabettu)'s book

[BOOTH link](https://booth.pm/ja/items/829853)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# Unit test
npm test
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 成果物

[MyMarkdown](https://mymarkdown-3b8fc.firebaseapp.com/)

## テキスト外学習
1. TDDに興味があったので、テキスト外学習としてVue-test-util+Jestでテストコードを書いた
1. CSSの代わりにVuetifyを使って見た目を整える
1. テストコードが動作しなくなったのでいろいろやるも、Vuetifyのボタンやなんやらはスタブ化されてHTMLレンダリングされないため、Triggerでエミュレートできないという課題を抱える（動かないテストはコメントアウト）
1. Webpack4へアップデート
1. 別ブランチを切ってテストツールをAvoriazに変更したブランチを作成。Vertifyのコンポーネントがレンダリングされるがtextareaへのinputでmethodが動かないため困る
