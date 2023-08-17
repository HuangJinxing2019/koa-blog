<template>
  <div class="wrapper">
    <div class="content">
      <h1 class="title">{{ detail.title }}</h1>
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
    }
  },

  mounted() {
    this.initMarkdown()
    this.renderMarkdown()
    this.$nextTick(() => {
      const toc = document.querySelector('.table-of-contents')
      toc && this.$refs.toc.appendChild(toc)
    })
  },
}
</script>

<style lang="scss">
@import "highlight.js/scss/github-dark-dimmed";
.wrapper {
  position: relative;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  font-size: 0.35rem;
  .content{
    width: 900px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: var(--bg-color-content);
    h1,h2,h3,h4,h5,h6,b,strong{font-weight:bold}
    h1{
      margin: 0.68rem 0;
      font-size: .8rem;
    }
    h2{
      margin: 0.56rem 0;
      font-size: .6rem;
    }
    h3{
      margin: 0.44rem 0;
      font-size: .5rem;
    }
    h4{
      margin: 0.32rem 0;
      font-size: .4rem;
    }
    h5{
      margin: 0.27rem 0;
      font-size: .32rem;
    }
    h6{
      margin: 0.2rem 0;
      font-size: .25rem;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    p {
      padding: 5px 0;
    }
    ul{
      list-style: disc;
      padding: 5px 0 5px 15px;
    }
    ol {
      list-style: str-index;
      padding: 5px 0 5px 15px;
      li{
        padding: 5px 0 5px 0;
      }
    }
  }
  .rightContent{
    width: 290px;
    right: 0;
    top: 0;
    .toc{
      position: sticky;
      top: 78px;
      width: 100%;
      border-radius: 4px;
      background-color: var(--bg-color-content);
      padding: 0 20px 20px 20px;
      box-sizing: border-box;
      .toc-title{
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid var(--border-color-def);
      }
      .table-of-contents {
        margin-top: 20px;
        ul{
          font-size: 16px;
          padding: 0 10px;
          a {
            width: 100%;
            display: block;
            padding: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

pre.hljs {
  position: relative;
  padding: 30px 2px 0 40px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  .code-content {
    display: block !important;
    height: 0;
    margin: 0 10px !important;
    overflow-x: hidden;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,&::-webkit-scrollbar-track {
      background: #1E1E1E;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1E1E1E;
      width: 6px
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 40px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, .66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 7px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
  .exp{
    display: none;
  }
  .exp:checked+.code-content{
    height: auto;
    max-height: 500px;
    overflow: auto;
    padding: 10px 0;
  }
  .code-top-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 30px;
    top: 2px;
    left: 0;
    padding: 0 10px 0 15px;
    box-sizing: border-box;
    z-index: 10;
    border-bottom: 1px solid var(--border-color-def);
    box-shadow: 1px 1px 2px #47505b;
    .input-label{
      width: 30px;
      .icon {
        display: block;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 7px solid var(--border-color-icon);
      }
    }

    .copy-btn {
      color: var(--text-color-gray);
      cursor: pointer;
      border: 0;
      border-radius: 2px;
    }
  }
  .exp:checked+.code-content{
    .code-top-bar{
      .icon{
        border-bottom: 0;
        border-top: 7px solid var(--border-color-icon);
        border-right: 7px solid transparent;
        border-left: 7px solid transparent;
      }
    }

  }
}



</style>
