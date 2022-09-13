<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="closeDialog"
    :append-to-body="true"
    width="500px"
    :fullscreen="fullscreen"
    class="dialog-container-default"
    @opened="makeQrcode()"
  >
    <div slot="title" class="dialog-container-title">
      <svg-icon :icon-class="svgIcon" />
      <span>{{ title }}</span>
    </div>
    <!-- <div id="qrcode" ref="QrCode" class="qrcode" /> -->
    <canvas id="qrcode" class="qrcode" />
    <div class="tips">{{ tips }}</div>
  </el-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import _ from 'lodash'
import { mapActions } from 'vuex'
import WalletConnectClient from '@/utils/wallet_connect'
import qrcode from 'qrcode'

export default {
  name: 'EditUserDialog',
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '授权'
    },
    icon: {
      type: String,
      default: 'ic_link_invite_b'
    },
    tips: {
      type: String,
      default: '请使用数据APP，完成扫码签名操作，扫码完成后，您设置的额度即可生效。'
    },
    uri: {
      type: String,
      default: 'www.wenchu.io'
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    svgIcon() {
      const { icon } = this
      return icon || 'ic_link_invite_b'
    }
  },
  watch: {
    visible(val) {
      this.$emit('update:visible', val)
      const client = WalletConnectClient.getInstance()
      const { _connected } = client.client
      if (_connected) client.clear({ callReuestList: ['connect', 'call_request'] })
      if (val) {
        this.makeQrcode()
      }
    }
  },
  methods: {
    ...mapActions('code', ['updateCodeData']),
    closeDialog() {
      this.$emit('update:visible', false)
    },
    makeQrcode() {
      const { uri } = this
      this.$nextTick(async() => {
        const code = document.querySelector('#qrcode')
        qrcode.toCanvas(code, uri)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  ::v-deep .el-dialog__body{
    text-align: center;
  }
.qrcode{
    width: 220px;
    height: 220px;
    margin: 44px auto;
}
.tips{
    width: 70%;
    margin: 0 auto;
    text-align: center;
}
</style>
