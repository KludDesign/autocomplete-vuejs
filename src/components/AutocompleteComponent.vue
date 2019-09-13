<template>
  <div class="autocomplete">
    <div class="search">
      <label for="autocomplete-input">Pays</label>
      <input
        id="autocomplete-input"
        class="autocomplete-search"
        type="text"
        autocomplete="off"
        placeholder="Search country"
        v-model="textSearch"
        @focus="onVisible = true"
        @blur="blur"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.space="onSpace"
      />
    </div>

    <ul
      class="autocomplete-result"
      v-show="onVisible"
    >
      <li
        class="autocomplete-items"
        :class="{ 'is-active': i === arrowCounter }"
        v-for="(country, i) in filteredCountries"
        :key="i"
        @click="setCountry(country.name)"
      >
        <img class="flag" :src="country.flag" :alt="country.name" />
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
      onVisible: false,
      arrowCounter: -1
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
    },

    // Hover the item below on the list
    onArrowDown () {
      if (this.arrowCounter < this.filteredCountries.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },

    // Hover the item under on the list
    onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },

    // Select the coresponding country when clicking on the space barre
    onSpace () {
      this.textSearch = this.filteredCountries[this.arrowCounter].name
      this.onVisible = false
      this.arrowCounter = -1
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

.autocomplete {
  max-width: 500px;

  .search {
    background-color: #fff;
    padding: 30px;
  }

  label {
    color: $el-color;
  }

  input[type=text] {
    width: 100%;
    margin: 20px 0 0 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid $el-color;
  }

  ul.autocomplete-result {
    max-height: 200px;
    overflow: scroll;
    width: inherit;
    padding: 0;
    background-color: #fff;
    margin: -20px 30px 0 30px;
    -webkit-box-shadow: 0 0 4px 4px #eee;
    -moz-box-shadow: 0 0 4px 4px #eee;
    box-shadow: 0 0 4px 4px #eee;

    li.autocomplete-items {
      cursor: pointer;
      list-style-type: none;
      background-color: #fff;
      padding: 5px 0px 5px 10px;
      text-align: left;
    }

    li.is-active,
    li.autocomplete-items:hover {
      background-color: $el-color;
    }
  }
}

.flag {
  width: 20px;
}

</style>
