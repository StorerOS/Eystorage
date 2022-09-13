
<template>
  <el-dialog
    :visible.sync="visible"
    width="700px"
    :before-close="closeDialog"
    append-to-body
    class="dialog-container-default"
  >
    <div slot="title" class="dialog-container-title">
      <span>{{ `UNLOCK ACCOUNT` }}</span>
    </div>
    <div class="tips">Please enter the account to be unlocke e will send an email to change the password to your email. After the password is changed successfully, the account willbe unlocked.password to your email. After the password is changed successfully, the account willbe unlocked.</div>
    <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
      <el-form-item prop="email">
        <div class="label-container">
          <svg-icon icon-class="email" />
          <span>EMAIL</span>
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
      <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.changeEmail" @click.native.prevent="recoverPassword">CONFIRM</el-button>
    </div>
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
  data() {
    return {
      submitForm: {
        email: ''
      },
      formRules: {
        email: [
          { required: true, trigger: 'blur', message: 'Please enter the email' },
          { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: 'Please enter the correct email', trigger: 'blur' }
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
        await sendEmailCode2({ email, email_type: 2 })
        this.$message.success('Mail sent successfully')
        this.closeDialog()
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
