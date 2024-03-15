<template>
  <div id="ThirdService">
  </div>
</template>

<script>
import config from '@/config'
import { getToken } from '@/libs/util'
export default {
  created() {
    // /servicemanage/500
    this.$axios.request({
      url: '/servicemanage/' + config.nodeId,
      method: 'GET'
    }).then(res => {
      const req = '&api=' + config.baseUrl + '&token=' + getToken()
      console.log(res, 'res-----------------', req)
      window.open(res.data.url + req, '_blank')
    }).catch(err => {
      this.$msg({
        type: 'error',
        message: err
      })
    })
    this.$router.go(-1)
  }
}
</script>

<style>

</style>
