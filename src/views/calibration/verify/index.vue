<template>
  <div v-if="!isCheckPass" class="content-container">
    <div class="content-main-container">
      <div class="content__title">Uh oh! Your link is broken</div>
      <div class="content__text">This is embarassing, and we’re sorry for the inconvenience. Please re-apply for sending the confirm email</div>
      <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="sendEmail">GET CONFIRM EMAIL</el-button>
    </div>
    <tips-dialog :visible.sync="tipsDialogVisible" :title="tipsDialogInfo.title" :content="tipsDialogInfo.content" />
  </div>
</template>

<script>
import { checkValidity, sendEmail, sessionValidity } from '@/api/user'
import { Loading } from 'element-ui'
import { loadingMixin } from '@/mixin'
import TipsDialog from '../components/tips-dialog.vue'
import { mapActions } from 'vuex'
import { setToken } from '@/utils/auth'

export default {
  name: 'Verify',
  components: { TipsDialog },
  mixins: [loadingMixin],
  data() {
    return {
      isCheckPass: true,
      tipsDialogVisible: false,
      tipsDialogInfo: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.checkValidity()
  },
  methods: {
    ...mapActions({
      setAllUserInfo: 'user/setAllUserInfo',
      setToken: 'user/setToken'
    }),
    async checkValidity() {
      const loadingInstance = Loading.service({ fullscreen: true })
      const { email, type, token } = this.$route.params
      const queryParams = {
        email
      }
      try {
        const { data } = await checkValidity(queryParams)
        this.isCheckPass = data.result || false
        if (this.isCheckPass) {
          if (type === '1') { // recover password
            this.$router.push(`/set-password/1/${email}`)
          } else if (type === '2') { // unlock
            this.$router.push(`/set-password/2/${email}`)
          }
        }
      } catch (err) {
        this.isCheckPass = false
      } finally {
        loadingInstance.close()
      }
    },
    sendEmail() {
      const { email, type } = this.$route.params

      const queryParams = {
        email,
        email_type: Number(type)
      }
      this.$_loadingMixin_start(async() => {
        await sendEmail(queryParams)
        this.tipsDialogInfo.title = 'Mail was sent'
        let messageText = ''
        if (type === '1') {
          messageText = 'Reset password email sent.Please enter the mailbox to check and confirm.'
        } else if (type === '2') {
          messageText = 'ConFirm email has been sent.Please enter the mailbox to check and confirm.'
        }
        if (messageText) {
          this.tipsDialogInfo.content = messageText
          this.tipsDialogVisible = true
        } else {
          this.$message.error('Operation failed')
        }
      }, 'operation')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 52px;
}
.content {
  &__text {
    @include font-size-ceil-large;
    @include mediumFontFamily;
    padding: 29px 50px 0;
    color: $colorTextPrimary;
  }
}
.operation-btn {
  width: 100%;
  margin-top: 71px;
}
</style>
