export const formRules = {
  email: [
    { required: true, trigger: 'blur', message: 'Please enter the email' },
    { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: 'Please enter the correct email', trigger: 'blur' }
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
      errorText = 'Password must contain numbers and letters and be 8-32 characters long'
    } else if (password && confirm_password && password !== confirm_password) {
      errorText = 'The passwords you entered are inconsistent'
    }
    errorText ? callback(new Error(errorText)) : callback()
  }
}
