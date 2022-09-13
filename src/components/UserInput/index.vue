<!--
 * @Author: yaohongbin
 * @Date: 2021-11-04 18:49:48
 * @LastEditors: yaohongbin
 * @LastEditTime: 2022-06-29 14:05:42
 * @FilePath: \node-user-frontend\src\components\UserInput\index.vue
* @Description: User name search component
-->

<template>
  <search-input v-bind="$attrs" :request-options="searchOptions" :response-callback="responseCallback" v-on="$listeners">
    <slot />
  </search-input>
</template>

<script>
import SearchInput from '@/components/SearchInput'

export default {
  name: 'UserInput',
  components: {
    SearchInput
  },
  computed: {
    searchOptions() {
      return {
        url: '/platform/list/user',
        method: 'post',
        data: {
          user_name: this.$attrs.value,
          page_no: 0,
          page_size: 0
        }
      }
    }
  },
  methods: {
    responseCallback({ data }) {
      return data.users.map(item => ({
        value: item.user_name,
        name: item.user_name
      }))
    }
  }
}
</script>

<style>

</style>
