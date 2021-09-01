import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import FormTest from './views/FormTest'
import "@/plugins/apexcharts"

Vue.component("FormTest", FormTest)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
