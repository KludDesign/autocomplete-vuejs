<template>
  <div class="autocomplete">
    <h1>Autocompletion component</h1>
    <input
      id="input-search"
      type="text"
      v-model="textSearch"
      @focus="onVisible = true"
      @blur="blur"
      autocomplete="off"
      placeholder="Search..."
      debounce="500"
    />

    <ul

      v-show="onVisible"
    >
      <li
        class="country-list"
        v-for="country in filteredCountries"
        @click="setCountry(country.name)"
      >
        <img class="country-flag" :src="country.flag" :alt="country.name" />
        {{ country.name }}
      </li>
    </ul>

  </div>
</template>

<script>
import RestcountriesApi from '@/services/RestcountriesApi'

export default {
  data () {
    return {
      textSearch: '',
      dataCountries: [],
      onVisible: false
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
      this.dataCountries = response.data
    },

    // Set the input area with the clicked value
    setCountry (country) {
      this.textSearch = country
      this.onVisible = false
    },

    // Close the list item when clicking out the input fiels
    blur () {
      setTimeout( () => this.onVisible = false, 200) // Need setTimeout in order to have setCountry @click event working
    }
  },

  computed: {
    // This return the list of filtered countries dependening of the input value typed by the user
    filteredCountries () {
      return this.dataCountries.filter( country => {
        return country.name.toLowerCase().startsWith(this.textSearch.toLowerCase())
      })
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

.country-list {
  cursor: pointer;
}

.country-flag {
  width: 20px;
}

li {
  list-style-type: none;
  background-color: #fff;
  padding: 5px 0px;
}

ul {
  height: 200px;
  overflow: scroll;
}

</style>
