<template>
  <div>
    <div class="wc-title">
      <div>
        <svg-icon icon-class="ic_userInfo_info" />
        <span>{{ $t('UserInfo.AccountInformation') }}</span>
      </div>
    </div>
    <div class="wc-card info-container">
      <div class="flex_box info-container__item">
        <div class="info-container__tit">{{ $t('UserInfo.DID') }}：</div>
        <div class="info-container__val">{{ info.user_did || $t('UserInfo.NULLDID') }}</div>
        <el-button type="primary" plain @click="handleChangeDid">{{ $t('UserInfo.ReplaceDID') }}</el-button>
      </div>
      <div class="flex_box info-container__item">
        <div class="info-container__tit">{{ $t('UserInfo.Email') }}：</div>
        <div class="info-container__val">{{ info.email || $t('UserInfo.NULLEmail') }}</div>
        <template v-if="info.email">
          <el-button type="primary" plain @click="handleChangePwd">{{ $t('UserInfo.ResetPassword') }}</el-button>
          <el-button type="primary" plain @click="hadnleChangeEmail">{{ $t('UserInfo.ReplaceEmail') }}</el-button>
        </template>
        <router-link v-else to="/bind/checkout/email"><el-button type="primary" plain>{{ $t('UserInfo.BindEmail') }}</el-button></router-link>
        <!-- <router-link to="/bind/checkout/email"><el-button type="primary" plain>{{ $t('UserInfo.BindEmail') }}</el-button></router-link> -->
      </div>
      <div class="flex_box align_end info-container__item">
        <div class="flex_box align_start info-container__val">
          <div class="info-container__tit">{{ $t('UserInfo.Avatar') }}：</div>
          <img v-if="info.image_url" :src="info.image_url" class="head-img" alt="">
          <img v-else src="@/assets/def_head.png" alt="" class="head-img">
        </div>
        <el-upload
          action=""
          :multiple="false"
          accept="image/png, image/jpeg"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :http-request="handleUploadPic"
        >
          <el-button
            :loading="loadingMixin.upload"
            type="primary"
            plain
          >{{ $t('UserInfo.Replace') }}</el-button>
        </el-upload>
      </div>
    </div>
    <!-- <div class="wc-title">
      <div>
        <svg-icon icon-class="ic_userInfo_setting" /> <span>{{ $t('UserInfo.BasicSetting') }}</span>
      </div>
    </div>
    <div class="wc-card flex_box">
      <div>{{ $t('UserInfo.ExchangeRate') }}：</div>
      <el-select v-model="info.ex_rate" @change="handleChangeRate">
        <el-option
          v-for="item in rateList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div> -->

    <div class="wc-title">
      <div>
        <svg-icon icon-class="ic_userInfo_logout" />
        <span>{{ $t('UserInfo.LogoutOfEybank') }}</span>
      </div>
    </div>
    <div class="wc-card flex_box justify_bwt">
      <div>
        {{ $t('UserInfo.LogoutTips') }}.
      </div>
      <el-button type="primary" plain @click="handleLogout">{{ $t('UserInfo.Logout') }}</el-button>
    </div>
    <div class="wc-title">
      <div>
        <svg-icon icon-class="ic_userInfo_log" /> <span>{{ $t('UserInfo.OperationLog') }}</span>
      </div>
    </div>
    <div class="wc-card">
      <el-table :data="logList">
        <el-table-column prop="location" :label="$t('UserInfo.City')" align="center" />
        <el-table-column prop="created_time" :label="$t('UserInfo.Time')" align="center">
          <template v-slot="{ row }">
            <div>{{ row.created_time | parseTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ip" :label="$t('UserInfo.IP')" align="center" />
        <el-table-column prop="abc" :label="$t('UserInfo.Operate')" align="center">
          <template v-slot="{ row }">
            <div>{{ $t(logOperType(row.oper_type).text) }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="hasMore" type="primary" plain class="btn" @click="nextPage">Load More</el-button>
    </div>
    <wc-code :tips="codeData.tips" :visible.sync="codeData.visible" :uri="codeData.uri" :title="codeData.title" :icon="codeData.icon" />
    <change-pwd-dialog :visible.sync="changePwdVisible" />
    <change-email-dialog :visible.sync="changeEmailVisible" />
  </div>
</template>

<script>
import { subTopic, bindDid } from '@/api/common'
import { mapActions, mapGetters } from 'vuex'
import { userDetail, userChangeRate, userOperLog } from '@/api/user'
import { uploadImage, submitImage } from '@/api/common'
import { logOperType } from '@/utils/data-const'
import { loadingMixin } from '@/mixin'
import wcCode from '@/components/CodeDialog'
import WalletConnectClient from '@/utils/wallet_connect'
import changePwdDialog from './changePwd.vue'
import changeEmailDialog from './changeEmail.vue'
export default {
  components: { wcCode, changePwdDialog, changeEmailDialog },
  mixins: [loadingMixin],
  data() {
    return {
      rate: '',
      rateList: ['CNY', 'USD'],
      info: {},
      logList: [],
      page_no: 0,
      page_size: 5,
      hasMore: false,
      logOperType,
      changePwdVisible: false,
      changeEmailVisible: false,
      codeData: {
        visible: false,
        tips: 'Please use the new DID wallet to scan the code',
        title: 'Replace the DID',
        uri: 'www.baidu.com',
        icon: 'wc_code'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.initData()
    this.getLogList()
  },
  methods: {
    ...mapActions('user', ['setAllUserInfo']),
    async initData() {
      const { data } = await userDetail({})
      this.info = data
    },
    nextPage() {
      const { page_no } = this
      this.page_no = page_no + 1
      this.getLogList()
    },
    async getLogList() {
      const { page_no, page_size } = this
      const { data: { list }} = await userOperLog({ page_no, page_size })
      this.logList = list
    },
    async handleLogout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    async handleChangeRate(ex_rate) {
      userChangeRate({ ex_rate }).then(() => {
        this.$message.success(this.$t('AlertMsg.Successfuloperation'))
        this.initData
      })
    },
    beforeUpload(file) {
      const { type } = file
      const typeList = ['image/png', 'image/jpeg', 'image/jpg']
      if (!typeList.includes(type)) {
        this.$message.error(this.$t('AlertMsg.SelectPicTypeTips'))
        return false
      }
    },
    handleUploadPic(fileObj) {
      const { file } = fileObj

      const formData = new FormData()
      formData.append('image_file', file)
      formData.append('image_name', file.name)
      this.$_loadingMixin_start(async() => {
        const { data: { image_name }} = await uploadImage(formData)
        await submitImage({ image_name })
        this.$message.success(this.$t('AlertMsg.Successfuloperation'))
        this.initData()
      }, 'upload')
    },
    async handleChangeDid() {
      const { codeData } = this
      const { client } = WalletConnectClient.getInstance()
      this.client = client
      console.log(client)
      if (!client._connected) {
        await client.createSession()
      }
      this.codeData = {
        ...codeData,
        visible: true,
        uri: client.uri
      }
      await subTopic({
        wc: client.uri,
        topic: client.clientId
      })
      this.bindDidCallRequest()
    },
    async bindDidCallRequest() {
      const { client, userInfo } = this
      client.on('connect', async() => {
        bindDid({
          user_did: client.accounts[0],
          topic: client.clientId
        }).then(() => {
          this.$message.success(this.$t('AlertMsg.ModifyDIDSuccessfully'))
          client.killSession()
          this.codeData.visible = false
          this.initData()
          this.setAllUserInfo({ ...userInfo, user_did: client.accounts[0] })
        })
      })
    },
    async handleChangePwd() {
      this.changePwdVisible = true
    },
    hadnleChangeEmail() {
      this.changeEmailVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.flex_box {
  display: flex;
  align-items: center;
}
.wc-card {
  min-height: 40px;
}
.info-container {
  font-size: 14px;
  color: #434343;
  &__tit{
    margin: 0 10px;
    width: 50px;
    text-align: right;
  }
  .align_end {
    align-items: flex-end;
  }
  .align_start {
    align-items: flex-start;
  }
  &__val{
    margin:0 40px 0 0;
  }
  &__item{
    margin:20px 0 0;
  }
}
.justify_bwt {
  justify-content: space-between;
}

.head-img {
  width: 140px;
  height: 140px;
}
</style>
