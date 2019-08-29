<template>
  <div>
    <h1>Autocompletion component</h1>
    <div v-for="contryData in contriesData">
      <p>{{ contryData.name }}</p>
    </div>
  </div>
</template>

<script>
import RestcountriesApi from '@/services/RestcountriesApi'

export default {
  data () {
    return {
      contriesData: null
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
      this.contriesData = response.data
    }
  }
}
</script>

<style lang="scss" scoped>

$text-color: #94bbdc;
$background-color: #f2f5f7;

h1 {
  color: $text-color;
}

</style>
