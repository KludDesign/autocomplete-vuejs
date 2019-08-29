<template lang="html">
  <div class="">
    <h1>Autocompletion component</h1>
    <p>{{ contries }}</p>
  </div>
</template>

<script>
import RestcountriesApiService from '@/services/RestcountriesApiService'

export default {
  data () {
    return {
      contries: []
    }
  },

  mounted () {
    this.getContries()
  },

  methods: {
    async getContries () {
      const response = await RestcountriesApiService.getAllContries()
      this.contries = response.data
    }
  }
}
</script>

<style lang="css" scoped>
</style>
