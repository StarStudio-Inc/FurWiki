// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
// 客户端：暗黑切换径向动画
import './dark-transition'

export default {
  extends: DefaultTheme,

}