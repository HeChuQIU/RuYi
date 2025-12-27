import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ui from '@nuxt/ui/vue-plugin'
import './assets/css/main.css'
import App from './App.vue'
import router from './router'
import { getApolloClient } from './composables/graphql/adapter'

const apolloClient = getApolloClient()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.use(ui)

app.mount('#app')
