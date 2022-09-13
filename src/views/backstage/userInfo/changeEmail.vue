<template>
  <el-dialog
    :visible.sync="visible"
    width="700px"
    :before-close="closeDialog"
    class="dialog-container-default"
  >
    <div slot="title" class="dialog-container-title">
      <span>{{ $t('UserInfoChageEmail.ReplaceEmail') }}</span>
    </div>
    <div class="tips">{{ $t('UserInfoChageEmail.Tips') }}</div>
    <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
      <el-form-item prop="email">
        <div class="label-container">
          <svg-icon icon-class="email" />
          <span>{{ $t('UserInfoChageEmail.EMAIL') }}</span>
        </div>
        <el-input
          ref="name"
          v-model="submitForm.email"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
    <div class="operation-box">
      <el-button type="primary" class=" operation-btn" :loading="loadingMixin.changeEmail" @click.native.prevent="recoverPassword">{{ $t('UserInfoChageEmail.CONFIRM') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import { sendEmailCode } from '@/api/common'
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
  data() {
    return {
      submitForm: {
        email: ''
      },
      formRules: {
        email: [
          { required: true, trigger: 'blur', message: this.$t('FormVaildMsg.EnterEmail') },
          { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: this.$t('FormVaildMsg.CorrectEmail'), trigger: 'blur' }
        ]
      }
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
      const { email } = this.submitForm
      this.$_loadingMixin_start(async() => {
        await sendEmailCode({ email, type: 2 })
        this.$router.push(`/set-email/${email}`)
      }, 'changeEmail')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
  margin:20px auto 30px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}
.operation-btn{
  min-width:220px;
  margin:0 auto;
}
.operation-box{
  text-align: center;
}
.label-container{
  font-size: 20px;
  color: #333333;
  margin-bottom: 15px;
  .svg-icon{
    margin-right: 15px;
  }
}
</style>
