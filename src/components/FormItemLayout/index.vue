<!--
 * @Author: yaohongbin
 * @Date: 2021-10-28 09:29:22
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-29 14:05:06
 * @FilePath: \node-user-frontend\src\components\FormItemLayout\index.vue
 * @Description: Form layout components
-->

<template>
  <el-col v-bind="defaultAttrs" v-on="$listeners">
    <slot />
  </el-col>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'FormItemLayout',
  computed: {
    defaultAttrs() {
      const defaultAttribute = {
        sm: 12,
        md: 8,
        lg: 6
      }
      return _.assign(defaultAttribute, this.$attrs)
    }
  }

}
</script>

<style>

</style>
