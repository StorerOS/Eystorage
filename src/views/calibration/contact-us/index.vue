<template>
  <div class="contact-container">
    <div class="contact-container__title">深圳文储科技有限公司</div>
    <div><svg-icon icon-class="ic_contact_phone" />电话:0757-28109365</div>
    <div><svg-icon icon-class="ic_contact_email" />邮箱:storeros@wenchu.io</div>
    <div><svg-icon icon-class="ic_contact_address" />地址:深圳市南山区科技园南区粤兴四道北京航空航天大厦1号楼3楼3327</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.contact-container{
    margin:150px 0;
    color: #fff;
    font-size: 32px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    line-height: 80px;
    &__title{
        font-size: 38px;
        font-weight: bold;
        font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
    }
    .svg-icon{
        margin-right: 20px;
    }
}
</style>
