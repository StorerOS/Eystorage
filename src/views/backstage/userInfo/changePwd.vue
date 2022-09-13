<template>
  <el-dialog
    :visible.sync="visible"
    width="700px"
    :before-close="closeDialog"
    class="dialog-container-default zindex3000"
  >
    <div slot="title" class="dialog-container-title">
      <span>{{ $t('UserInfoChagePwd.RecoverPassword') }}</span>
    </div>
    <div class="tips">{{ $t('UserInfoChagePwd.Tips') }}</div>
    <div class="operation-box"><el-button type="primary" class=" operation-btn" :loading="loadingMixin.changePwd" @click.native.prevent="recoverPassword">{{ $t('UserInfoChagePwd.RecoverPassword') }}</el-button></div>
  </el-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import { sendEmailCode2 } from '@/api/common'
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePwdDialog',
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
    recoverPassword() {
      const { email } = this.userInfo
      this.$_loadingMixin_start(async() => {
        await sendEmailCode2({
          email,
          email_type: 1
        })
        this.$message.success(this.$t('UserInfoChagePwd.TheVerificationCodeHasBeenSent'))
        this.closeDialog()
      }, 'changePwd')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
  margin:47px auto 72px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}
.operation-box{
  text-align: center;
}
.operation-btn{
  min-width:220px;
  margin:0 auto;
}
.zindex3000{
  z-index: 3000;
}
</style>
