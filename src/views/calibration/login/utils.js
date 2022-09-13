import Vue from 'vue'
export const formRules = {
  name: [
    { required: true, trigger: 'blur', message: Vue.$t('FormVaildMsg.EnterEmail') },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: Vue.$t('FormVaildMsg.CorrectEmail'), trigger: 'blur' }
  ],
  email: [
    { required: true, trigger: 'blur', message: Vue.$t('FormVaildMsg.EnterEmail') },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: Vue.$t('FormVaildMsg.CorrectEmail'), trigger: 'blur' }
  ],
  password: [{ required: true, trigger: 'blur', message: Vue.$t('FormVaildMsg.EnterPassword') }]
}
