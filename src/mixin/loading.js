/**
 * loading
 */

import _ from 'lodash'

export default {
  data() {
    return {
      loadingMixin: {}
    }
  },
  methods: {
    async $_loadingMixin_confirm(tips, fn, laodingName, title, options = {}) {
      const optionParams = _.assign({
        type: 'warning',
        title: _.isString(title) ? title : '提示'
      }, _.isObject(title) ? title : options)

      await this.$confirm(tips, optionParams.title, optionParams)
      await this.$_loadingMixin_start(fn, laodingName)
    },
    async $_loadingMixin_start(fn, loadingName) {
      loadingName && this.$set(this.loadingMixin, loadingName, true)
      try {
        await fn()
      } catch (err) {
        throw new Error(err)
      } finally {
        loadingName && this.$set(this.loadingMixin, loadingName, false)
      }
    }
  }
}
