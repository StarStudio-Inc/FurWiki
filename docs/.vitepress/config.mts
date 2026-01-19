import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FurWiki',
  description: 'Furry Wiki',
  lang: 'zh-CN',                     // 可选：让 html 标签带 lang="zh-CN"
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/StarStudio-Inc/FurWiki' },
      { icon: 'qq', link: 'https://qm.qq.com/q/RYn26aJbuo' }
    ],

    // 关键：开启本地搜索
    search: {
      provider: 'local',
      options: {
        translations: {              // 中文界面提示
          button: { buttonText: '搜索' },
          modal: {
            searchBoxPlaceholder: '搜索文档',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          } as any
        }
      }
    }
  }
})