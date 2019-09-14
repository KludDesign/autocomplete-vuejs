<template>
  <div id="app">
    <AutocompleteComponent :apiData="dataCountries" label="Country" placeholder="Search country" class="autocomplete-component"/>
  </div>
</template>

<script>
import AutocompleteComponent from './components/AutocompleteComponent.vue'
import RestcountriesApi from '@/services/RestcountriesApi'

export default {
  name: 'app',
  components: {
    AutocompleteComponent
  },

  data () {
    return {
      dataCountries: []
    }
  },

  mounted () {
    this.getContriesData()
  },

  methods: {
    // Get all the countries information from the API and put in contriesData variable
    async getContriesData () {
      const response = await RestcountriesApi.getAllContries()
      this.dataCountries = response.data
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.autocomplete-component {
  margin: auto;
}

body {
  background-color: $background-color;
}
</style>
