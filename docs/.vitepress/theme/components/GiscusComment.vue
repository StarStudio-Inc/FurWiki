<template>
  <Giscus
    repo="StarStudio-Inc/FurWiki"
    repoId="R_kgDOQ3B6Bg"
    categoryId="DIC_kwDOQ3B6Bs4C1GC0"
    mapping="pathname"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    lang="zh-CN"
    :theme="giscusTheme"
  />
</template>

<script setup>
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const giscusTheme = computed(() => (isDark.value ? 'dark_tritanopia' : 'light_tritanopia'))
</script>