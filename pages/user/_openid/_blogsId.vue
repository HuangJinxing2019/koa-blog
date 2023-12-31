<template>
  <div class="wrapper detail-page">
    <div class="content">
      <div class="title">{{ detail.title }}</div>
      <div ref="blogsRef" class="markdown-preview"></div>
    </div>
    <div class="rightContent">
      <div ref="toc" class="toc">
        <div class="toc-title">目录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getServerDomain } from '~/utils'
  import { queryUserBlogsById } from '~/config/api'
  import { copyText } from "~/utils";
  import MarkdownIt from 'markdown-it'
  import markdownItEmoji from 'markdown-it-emoji';
  import markdownItTaskLists from 'markdown-it-task-lists';
  import markdownItAnchor from 'markdown-it-anchor';
  import markdownItToc from 'markdown-it-table-of-contents';
  import { throttle } from 'loadsh'

  import hljs from 'highlight.js';

export default {
  name: 'BlogsDetail',
  layout: 'user',
  data() {
    return {
      detail: {},
      html: '',
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
          let htmlStr = hljs.highlight(validLanguage, code).value
          let [codeIndex, topHtml] = this.addTopHtml();
          let [lineNum ,lineNumberHtml] = this.addLineNumber(code);
          htmlStr = topHtml + htmlStr
          if(lineNum){
            htmlStr += '<b class="name">' + lang + '</b>'
          }
          const input = `<input id="exp_${codeIndex}" class="exp" type="checkbox" checked>`
          return `<pre class="hljs">${input}<code class="code-content">${htmlStr}</code>${lineNumberHtml}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${code.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`;
        }
      })
      this.md.use(markdownItEmoji); // 使用markdown-it-emoji插件
      this.md.use(markdownItTaskLists); // 使用markdown-it-task-lists插件
      this.md.use(markdownItAnchor); // 使用markdown-it-anchor插件
      this.md.use(markdownItToc, {
        includeLevel: [1, 2, 3] // 指定目录生成的标题级别
      });
    },
    renderMarkdown(){
      this.$refs.blogsRef.innerHTML = this.md.render(this.detail.content + '[[toc]]')
    },
    addTopHtml(){
      // 当前时间加随机数生成唯一的id标识
      const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
      // 复制功能主要使用的是 clipboard.js
      const copyBtn = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</button>`
      const icon = `<label for="exp_${codeIndex}" class="input-label"><span class="icon"></span></label>`
      const topHtml =(`<div class="code-top-bar">${icon}${ copyBtn }</div>`)
      return [codeIndex, topHtml]
    },
    addLineNumber(code){
      const linesLength = code.split(/\n/).length - 1
      // 生成行号
      let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
      for (let index = 0; index < linesLength; index++) {
        linesNum = linesNum + '<span></span>'
      }
      linesNum += '</span>'
      return [linesLength, linesNum]
    },
    addBtnClickChange(){
      const oBtns = document.querySelectorAll('.copy-btn')
      for (let obtn of oBtns){
        obtn.addEventListener('click', this.copyChange, false)
      }
    },
    copyChange(e){
      const clipboardId = e.target.dataset.clipboardTarget
      const value = document.querySelector(clipboardId).value
      copyText(value);
    },
    addHSpanEL(){
      const h1 = document.getElementsByTagName('h1') || []
      const h2 = document.getElementsByTagName('h2') || []
      const h3 = document.getElementsByTagName('h3') || []
      const h4 = document.getElementsByTagName('h4') || []
      const h5 = document.getElementsByTagName('h5') || []
      const h6 = document.getElementsByTagName('h6') || []
      const hList = [...h1, ...h2, ...h3, ...h4, ...h5, ...h6]
      this.hList = [...h1, ...h2, ...h3]
      hList.forEach(item => {
        const frag = document.createDocumentFragment()
        for(let i = 1; i <= 4; i++){
          let span = document.createElement('span')
          span.className = 'b' + i
          frag.appendChild(span)
        }
        item.appendChild(frag)
      })
    },
    getAnchor(){
      const anchor = document.querySelectorAll('.toc a[href^="#"]')
      anchor[0] && (anchor[0].className = 'active')
      this.anchorMap = [...anchor].reduce((pre, item) => {
        pre[item.getAttribute('href').slice(1)] = item
        return pre
      }, {})
      console.log(this.anchorMap)
    },
    scrollChange: throttle(function (e){
      this.hList.forEach(item => {
        const { top } = item.getBoundingClientRect()
        if(top < 200){
          for (let key in this.anchorMap){
            this.anchorMap[key].className = '';
          }
          this.anchorMap[item.id].className = 'active'
        }
      })
    }, 300)
  },

  mounted() {
    this.initMarkdown()
    this.renderMarkdown()
    this.$nextTick(() => {
      const toc = document.querySelector('.table-of-contents')
      toc && this.$refs.toc.appendChild(toc)
    })
    this.$nextTick(() => {
      this.addBtnClickChange()
      this.addHSpanEL()
      this.getAnchor()
    })
    const scrollContent = document.querySelector('.scroll-content')
    scrollContent.addEventListener('scroll', this.scrollChange, false)
  },
}
</script>

<style lang="scss">
@import "highlight.js/scss/github-dark-dimmed";
@import "style";
.wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  color: var(--text-color-detail);
  .content{
    flex: 1;
    margin-right: 10px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: var(--bg-color-content);
    .title{
      font-size: 32px;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 860px) {
    .rightContent{
      display: none;
    }
    .content{
      margin-right: 0;
    }
  }
}



</style>
