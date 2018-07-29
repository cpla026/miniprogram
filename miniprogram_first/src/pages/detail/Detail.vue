<template>
    <div>
      详情页 {{bookid}}
    </div>
</template>

<script>
    export default {
      name: 'detail',
      data () {
        return {
          bookid: ''
        }
      },
      mounted () {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
      },
      methods: {
        async getDetail () {
          const res = await this.$ajax.get('/book/getDetail', {
            id: this.bookid
          })
          if (res.status === 200) {
            console.log(res.data)
          }
        }
      }
    }
</script>

<style scoped>

</style>
