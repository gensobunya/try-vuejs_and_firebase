import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'babel-polyfill'
//css and iconはビルド時にエラーが出たのでimportではなくHTMLに記載

Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
