<template>
  <div class="search-container">
    <el-autocomplete
      v-model="val"
      :fetch-suggestions="querySearchAsync"
      :placeholder="$t('common.searchAddress')"
      @select="handleSelect"
    />
    <div class="search-container-btn"><svg-icon icon-class="ic_search" @click="enterSelect()" /></div>
  </div>
</template>

<script>
import { vagueSearchAddress } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      val: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    enterSelect() {
      const { val } = this
      this.handleSelect({ value: val })
    },
    handleSelect({ value }) {
      const { userInfo } = this
      if (userInfo && userInfo.auth_token) {
        if (value === userInfo.user_did) {
          this.$router.push(`/profile/index?address=${value}`)
          return
        }
        this.$router.push(`/info/index?address=${value}`)
      } else {
        this.$router.push(`/query?address=${value}`)
      }
    },
    async querySearchAsync(address, cb) {
      if (address === '') {
        cb([])
        return
      }
      const { data: { addresses }} = await vagueSearchAddress({ address })
      const result = addresses.map(item => { return { value: item } })
      cb(result)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container{
    display: flex;
    min-width: 750px;
    align-items: center;
    border:1px solid $colorPrimary;
    border-radius: 10px;
    height: 36px;
    margin:5px 10px;
    padding: 0 5px;
    &-btn{
        height: 30px;
        width: 30px;
        text-align: center;
        background:$colorPrimary;
        border-radius: 10px;
        line-height: 30px;
        cursor:pointer;
        .svg-icon{
            font-size: 16px;
        }
    }
}
.el-autocomplete{
    flex-grow: 2;
}
::v-deep .el-input__inner{
    border: 0px;
}
::v-deep .el-input__inner{
  height: 25px;
}
</style>
