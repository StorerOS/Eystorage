<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    :show-close="false"
    width="602px"
    lock-scroll
    destroy-on-close
  >
    <div slot="title" class="title-container">
      <div class="title-container__content">{{ $t('SwitchLogin.Title') }}</div>
      <svg-icon icon-class="ic_dialog_close" class="title-container__btn" @click="closeDialog" />
    </div>
    <div class="item" @click="showWcDialog"><div>{{ $t('SwitchLogin.WalletConnect') }}</div><img src="@/assets/icon/ic_wc.png" alt=""></div>
    <div class="item" @click="toLogin"><div>{{ $t('SwitchLogin.EMAIL') }}</div><img src="@/assets/icon/ic_mail.png" alt=""></div>
    <wc-code :tips="codeData.tips" :visible.sync="codeData.visible" :uri="codeData.uri" :title="codeData.title" :icon="codeData.icon" />

  </el-dialog>

</template>

<script>
import { subTopic, wcLogin } from '@/api/common'

import wcCode from '@/components/CodeDialog'
import WalletConnectClient from '@/utils/wallet_connect'
export default {
  components: { wcCode },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      codeData: {
        visible: false,
        tips: 'Please use the wallet to scan the code',
        title: 'Login in',
        uri: 'www.baidu.com',
        icon: 'wc_code'
      }
    }
  },
  methods: {
    async showWcDialog() {
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
      const { client } = this
      client.on('connect', async() => {
        wcLogin({
          user_did: client.accounts[0],
          topic: client.clientId
        }).then(async({ data }) => {
          this.$message.success('Login in successfully')
          // client.killSession()
          this.codeData.visible = false
          this.closeDialog()
          await this.$store.dispatch('user/setAllUserInfo', data)
          this.$router.push({ path: this.redirect || '/dashboard' })
        })
      })
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    toLogin() {
      this.closeDialog()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
    .title-container{
        position: relative;
        @include HeavyFontFamily;
        color: #333333;
        padding:25px 0 10px;
        font-size: 24px;
        text-align: center;
        &__btn{
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
        }
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0px 0 0 20px;
        border-radius: 10px;
        border:1px solid $colorPrimary;
        margin:0 0 10px 0;
        color:#333333;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        img{
            width: 50px;
        }
    }
</style>
