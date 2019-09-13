<v></v><template>
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
        @input="onTyping"
        @focus="onVisible = true"
        @blur="blur"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.space="onSpace"
      />
    </div>

    <ul
      class="autocomplete-result scrollbar"
      v-show="onVisible"
      ref="optionsList"
    >
      <li
        class="autocomplete-items"
        :class="{ 'is-active': i === arrowCounter }"
        v-for="(country, i) in filteredCountries"
        :key="i"
        @click="onClick(country.name)"
      >
        <img
          class="flag"
          :src="country.flag"
          :alt="country.name"
        />
        <span class="country-name" v-html="boldFilter(country.name)"></span>
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
      arrowCounter: -1,
      liItemHeight: 30
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
    onClick (country) {
      this.textSearch = country
      this.onVisible = false // Close the country list
    },

    // Hover the item below on the list
    onArrowDown () {
      if (this.arrowCounter < this.filteredCountries.length - 1) {
        this.arrowCounter += 1
        this.scrollToItem()
      }
    },

    // Hover the item under on the list
    onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1
        this.scrollToItem()
      }
    },

    // Select the coresponding country when clicking on the space barre
    onSpace () {
      this.textSearch = this.filteredCountries[this.arrowCounter].name
      this.onVisible = false // Close the country list
      this.arrowCounter = -1
      event.target.blur() // Unfocus the input after selected the element
    },

    // Close the list item when clicking out the input fiels
    blur () {
      if (this.filteredCountries.length < 1) {
        // Need setTimeout in order to have onClick @click event working
        setTimeout( () =>
          this.textSearch = '', // Emptying the textSearch if the user didn't type an existing country
          this.onVisible = false // Close the country list
        , 200)
      } else {
        setTimeout( () =>
          this.onVisible = false // Close the country list
        , 200)
      }
      this.arrowCounter = -1 // Remove the active item if selected by arrow keys
    },

    // Function used to scroll when using arrow keys
    scrollToItem () {
      if ((this.arrowCounter + 1) > 0) {
        this.$refs.optionsList.scrollTop = this.arrowCounter * this.liItemHeight
      }
    },

    // Function to bold dynamically the typed letters
    boldFilter (value) {
      return `<b>${value.substring(0, this.textSearch.length)}</b>${value.slice(this.textSearch.length)}`
    },

    // Verify if the list is empty or not and display it if not
    onTyping () {
      if (this.filteredCountries.length <= 0) {
        this.onVisible = false
      } else {
        this.onVisible = true
      }
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
    outline: none;
  }

  ul.autocomplete-result {
    max-height: 200px;
    overflow-y: scroll;
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
      height: 20px;
      overflow: hidden;

      span.country-name {
        margin-left: 10px;
      }
    }

    li.is-active,
    li.autocomplete-items:hover {
      background-color: $el-color;
    }
  }
}

.flag {
  height: 12px;
}

.scrollbar {
  margin: 10px;
  background-color: #fff;
}

.scrollbar::-webkit-scrollbar {
  width: 8px;
  background-color: $background-color;
  border-radius: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: $el-color;
  border-radius: 4px;
}

</style>