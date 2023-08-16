<template>
  <div class="wrapper">
    <div class="content">
      <h1 class="title">{{ detail.title }}</h1>
      <div ref="blogsRef"></div>
    </div>
    <div class="rightContent"></div>
  </div>
</template>

<script>
import { getServerDomain } from '~/utils'
import { queryUserBlogsById } from '~/config/api'

import MarkdownIt from 'markdown-it'
import markdownItEmoji from 'markdown-it-emoji';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItToc from 'markdown-it-table-of-contents';
import hljs from 'highlight.js';
export default {
  name: 'BlogsDetail',
  layout: 'user',
  data() {
    return {
      detail: {},
      html: ''
    }
  },
  async asyncData({ $axios, params, req }) {
    try {
      const {
        data: { data: detail },
      } = await $axios.post(getServerDomain(req) + queryUserBlogsById, {
        id: params.blogsId,
      })
      return {
        detail,
      }
    } catch (err) {}
  },
  methods: {
    initMarkdown(){
      this.md = new MarkdownIt({
        html: true, // 允许HTML标签
        linkify: true, // 自动识别和渲染链接
        typographer: true, // 优化文本格式，例如自动替换引号和短划线
        highlight: (code, lang) => {
          const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(validLanguage, code).value;
        }
      })
      this.md.use(markdownItEmoji); // 使用markdown-it-emoji插件
      this.md.use(markdownItTaskLists); // 使用markdown-it-task-lists插件
      this.md.use(markdownItAnchor); // 使用markdown-it-anchor插件
      this.md.use(markdownItToc, {
        includeLevel: [1, 2] // 指定目录生成的标题级别
      });
    },
    renderMarkdown(){
      this.$refs.blogsRef.innerHTML = this.md.render(this.detail.content + '[[toc]]')
    },
  },
  mounted() {
    this.initMarkdown()
    this.renderMarkdown()
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 1200px;
  background-color: var(--bg-color-content);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  .content{
    width: 800px;
    h1{
      margin: 6px 0;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}

</style>
