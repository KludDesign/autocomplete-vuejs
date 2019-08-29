<template>
  <div>
    <h1>Autocompletion component</h1>
    <input id="input-search" type="text" v-model="textSearch" placeholder='Search...'>
    <div v-for="contry in contries">
      <p>{{ contry.name }}</p>
    </div>
  </div>
</template>

<script>
import RestcountriesApi from '@/services/RestcountriesApi'

export default {
  data () {
    return {
      textSearch: '',
      contries: null
    }
  },

  mounted () {
    this.getContriesData()
  },

  methods: {
    // Get all the countries information from the API and put in
    // the contriesData variable
    async getContriesData () {
      const response = await RestcountriesApi.getAllContries()
      this.contries = response.data
    }
  }
}
</script>

<style lang="scss" scoped>

* {
  font-family: Campton;
}

h1 {
  color: $text-color;
}

</style>
