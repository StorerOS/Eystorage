import vue from 'vue'
export const formRules = {
  email: [
    { required: true, trigger: 'blur', message: vue.$t('FormVaildMsg.EnterEmail') },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: vue.$t('FormVaildMsg.CorrectEmail'), trigger: 'blur' }
  ],
  invite_code: [
    { required: true, trigger: 'blur', message: vue.$t('FormVaildMsg.EnterInvitationCode') }
  ]
}

export function validateConfirmPassword(emtpyText) {
  return (rule, value, callback) => {
    const { password, confirm_password } = this.form
    let errorText
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/g
    if (!value) {
      errorText = emtpyText
    } else if (!(passwordReg.test(value))) {
      errorText = vue.$t('FormVaildMsg.PasswordToLong')
    } else if (password && confirm_password && password !== confirm_password) {
      errorText = vue.$t('FormVaildMsg.PasswordInconsistent')
    }
    errorText ? callback(new Error(errorText)) : callback()
  }
}
