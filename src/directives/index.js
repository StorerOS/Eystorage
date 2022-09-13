
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
const highlight = {
  bind: function(el, binding) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      try {
        const str = block.innerHTML
        const lang = 'js'
        // 得到经过highlight.js之后的html代码
        let preCode = hljs.highlight(lang, str, true).value
        if (binding.value.extrasText) {
          preCode = preCode + binding.value.extrasText
        }
        // 以换行进行分割
        const linesLength = preCode.split(/\n/).length
        // const linesLength = preCode.split('<br></br>').length
        // 生成行号 aria-hidden 对浏览器语义化隐藏
        let linesNum = '<span aria-hidden="true" class="hljs-line-numbers-rows">'
        for (let index = 0; index < linesLength; index++) {
          linesNum = linesNum + '<span></span>'
        }
        linesNum += '</span>'

        let html = preCode

        html =
          '<pre class="hljs"><code>' + html + '</code>' + linesNum + '</pre>'

        block.parentNode.parentNode.innerHTML = html
      } catch (__) {
        console.log('执行错误', __)
      }
    })
  }
}
export {
  highlight
}
