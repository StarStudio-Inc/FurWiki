import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FurWiki",
  description: "Furry Wiki",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'Runtime API 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/StarStudio-Inc/FurWiki' },
      { icon: 'qq', link: 'https://qm.qq.com/q/RYn26aJbuo' }
    ]
  }
})
