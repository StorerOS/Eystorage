<!--
 * @Author: yaohongbin
 * @Date: 2021-11-01 09:39:09
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-29 14:05:33
 * @FilePath: \node-user-frontend\src\components\SearchInput\index.vue
 * @Description: Input search component
-->

<template>
  <el-autocomplete
    :fetch-suggestions="querySearchAsync"
    v-bind="$attrs"
    :value="value"
    :placeholder="placeholder"
    :trigger-on-focus="triggerOnFocus"
    :clearable="clearable"
    :value-key="valueKey"
    v-on="$listeners"
    @blur="blur"
    @select="select"
  >
    <slot />
    <template v-slot="{ item }">
      {{ item[valueKey] || item }}
    </template>
  </el-autocomplete>
</template>

<script>
import request from '@/utils/request'
import _ from 'lodash'

export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    requestOptions: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Please enter content'
    },
    responseCallback: {
      type: Function,
      default: null
    },
    searchLength: {
      type: Number,
      default: 3
    },
    triggerOnFocus: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      list: [],
      isClearText: true,
      cb: null,
      currentSelectedItem: null
    }
  },
  watch: {
    value(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      this.isClearText = true
      this.cb = cb // 获取回调函数，在非当前函数中使用（主要为了能在失去焦点时清除匹配的内容项）
      this.list = []
      if (!this.value || this.value.length < this.searchLength) {
        cb([])
        return
      }

      const requestOptions = this.requestOptions
      if (!requestOptions.method) requestOptions.method = 'get'

      try {
        const res = await request(requestOptions)
        const list = this.responseCallback ? this.responseCallback(res) : res.data.list
        if (_.isArray(list)) {
          this.list = list
          cb(list)
        } else {
          cb([])
          throw new Error(`${requestOptions.url}: [data.list] Response data without \'list\' parameter`)
        }
      } catch (err) {
        cb([])
      }
    },
    blur(e) {
      // 延迟一点时间清除value，解决选中项时出现值闪烁问题
      setTimeout(() => {
        if (
          this.isClearText &&
          (this.currentSelectedItem && this.value !== this.currentSelectedItem[this.valueKey] || !this.currentSelectedItem)
        ) this.$emit('input', '')
      }, 100)

      // 延迟一点时间清除，防止在点击获取选中项前清除
      setTimeout(async() => {
        await this.$nextTick()
        this.cb && this.cb([])
      }, 300)
    },

    // 解决autocomplete组件如果项不是对象时，会出现select事件触发后value值会置为undefined的问题
    select(item) {
      this.currentSelectedItem = item
      this.isClearText = false
      if (!item[this.valueKey]) {
        this.$emit('input', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
