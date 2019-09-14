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
    // Get all countries information from the API and
    // put it in variable to be consumed by the component
    async getContriesData () {
      const response = await RestcountriesApi.getAllContries()
      this.dataCountries = response.data
    }
  }
}
</script>

<style lang="scss">

body {
  background-color: $background-color;
}

.autocomplete-component {
  margin: auto;
}

</style>
