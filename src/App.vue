<template>
  <div id="app">
    <AutocompleteComponent @isoCode="getIsoCode($event)" :apiData="dataCountries" label="Country" placeholder="Select your country" class="autocomplete-component"/>
    <span class="emit-value">{{ isoCode }}</span>
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
      dataCountries: [],
      isoCode: ''
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
    },

    getIsoCode(value) {
      this.isoCode = value
    }
  }
}
</script>

<style lang="scss">

body {
  background-color: $background-color;

  .autocomplete-component {
    margin: auto;
  }
}

.emit-value {
  @include centerer;
  font-size: 10vw;
  color: $global-color;
  font-family: $font-family-global;
}

</style>
