<template>
  <div>
    <div class="wc-title"><div><svg-icon icon-class="ic_hi" /> <span>{{ $t('OpenAPI.WelcomeDeveloper') }}</span></div></div>
    <div class="wc-card">
      <div class="flex_box">
        <div>{{ $t('OpenAPI.Accesskey') }}：</div><div>{{ info.ak }}</div>
        <svg-icon icon-class="ic_copy" @click="copyInfo(info.ak)" />
      </div>
      <div class="flex_box">
        <div>{{ $t('OpenAPI.Secretkey') }}：</div><div>******************</div>
        <svg-icon icon-class="ic_copy" @click="copyInfo(info.sk)" />
        <el-button type="primary" size="default" @click="updateAkSk">{{ $t('OpenAPI.ResetAKSK') }}</el-button>
      </div>
      <div class="flex_box">
        <div>{{ $t('OpenAPI.Ratelimits') }}：</div>
        <div>{{ info.rate_limits }}</div>
      </div>
      <div class="flex_box bwt">
        <div />
        <a :href="info.docs_domain" target="_blank"><el-button type="primary" size="default">{{ $t('OpenAPI.APIDocuments') }}</el-button></a>
      </div>
    </div>
  </div>
</template>

<script>
import { openInfo, updateAk } from '@/api/common'
import copy from 'copy-to-clipboard'

export default {
  data() {
    return {
      info: {}
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await openInfo({})
      this.info = data
      if (!data.sk) {
        const { data: aksk } = await updateAk({})
        this.info = { ...data, ...aksk }
      }
    },
    async updateAkSk() {
      const { info, $t } = this
      const { data: aksk } = await updateAk({})
      this.info = { ...info, ...aksk }
    },
    copyInfo(msg) {
      copy(msg)
      this.$message.success(this.$t('AlertMsg.Successfuloperation'))
    }
  }

}
</script>

<style lang="scss" scoped>
.flex_box{
    display: flex;
    align-items: center;
    margin:10px 0;
    .svg-icon{
    margin:0  0 0 15px;
}
.el-button{
    margin-left:20px;
}
}
.wc-card{
    min-height: 50px;
}
.bwt{
  justify-content: space-between;
}

</style>
