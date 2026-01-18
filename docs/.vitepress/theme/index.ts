// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
// 客户端：暗黑切换径向动画
import './dark-transition'
import MyLayout from './components/MyLayout.vue'
import confetti from "./components/Confetti.vue"

export default {
  extends: DefaultTheme,
  app: {
    component: (name: string, component: any) => {
      app.component('confetti' , confetti)
    }
  },
  Layout: MyLayout,

}