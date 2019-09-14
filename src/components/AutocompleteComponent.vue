<template>
  <div class="autocomplete">
    <!-- Desktop display -->
    <div v-if="!isMobile()">
      <div class="desktop">
        <div class="search">
          <label for="autocomplete-input">{{ label }}</label>
          <input
            id="autocomplete-input"
            class="autocomplete-search"
            type="text"
            autocomplete="off"
            :placeholder="placeholder"
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
            v-for="(item, i) in filteredItems"
            :key="i"
            @click="onClick(item.name)"
          >
            <img
              class="image"
              :src="item.flag"
              :alt="item.name"
            />
            <span class="item-name" v-html="boldFilter(item.name)"></span>
          </li>
        </ul>

      </div>
      <span class="emit-value">{{ emitValue }}</span>
    </div>

    <!-- Mobile display -->
    <div v-else>
      <div class="mobile">
        <select
          id="select-item"
          v-model="mobileSelectedItem"
        >
          <option disabled value="">Select a country:</option>
          <option
            v-for="(item, i) in filteredItems"
            :value="item.alpha2Code"
          >
            <span>{{ item.name }}</span>
          </option>
        </select>
      </div>
      <span class="emit-value">{{ mobileSelectedItem }}</span>
    </div>
  </div>
</template>

<script>
import { detictingMobileMixin } from '@/plugins/DetictingMobileMixin'

export default {
  name: 'Autocomplete',
  props: ['apiData', 'placeholder', 'label'],
  mixins: [detictingMobileMixin],

  data () {
    return {
      textSearch: '',
      onVisible: false,
      arrowCounter: -1,
      liItemHeight: 30,
      mobileSelectedItem: ''
    }
  },

  methods: {
    // Set the input area with the clicked item value
    onClick (item) {
      this.textSearch = item
      this.onVisible = false // Close the item list
    },

    // Hover the item on the list when using arrow down
    onArrowDown () {
      if (this.arrowCounter < this.filteredItems.length - 1) {
        this.arrowCounter += 1
        this.scrollToItem()
      }
    },

    // Hover the item on the list when using arrow up
    onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1
        this.scrollToItem()
      }
    },

    // Select the coresponding item when clicking on the space bar
    // Change this value in case using an other API
    onSpace () {
      this.textSearch = this.filteredItems[this.arrowCounter].name
      this.onVisible = false
      this.arrowCounter = -1
      event.target.blur() // Unfocus the input after having selected the element
    },

    // Close the list item when clicking out the input fiels
    blur () {
      if (this.filteredItems.length < 1) {
        // Need setTimeout in order to have onClick event working
        setTimeout( () =>
          this.textSearch = '',
          this.onVisible = false
        , 200)
      } else {
        setTimeout( () =>
          this.onVisible = false
        , 200)
      }
      this.arrowCounter = -1 // Remove the active item if selected by arrow keys
    },

    // Function used to scroll down / up when using arrow keys
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
      if (this.filteredItems.length <= 0) {
        this.onVisible = false
      } else {
        this.onVisible = true
      }
    }
  },

  computed: {
    // Return the list of filtered items dependening of the input value typed by the user
    filteredItems () {
      return this.apiData.filter( item => {
        return item.name.toLowerCase().startsWith(this.textSearch.toLowerCase()) // Change this values in case using an other API
      })
    },

    // Emit the ISO value when the input corresponding to an existing country
    // Change this values in case using an other API
    emitValue () {
      if (this.filteredItems.length === 1 && this.textSearch.toLowerCase() === this.filteredItems[0].name.toLowerCase()) {
        return this.filteredItems[0].alpha2Code
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.autocomplete {
  font-family: $font-family-global;

  .desktop {
    max-width: 500px;
    margin: auto;
    @include scrollbar ($background-color, $global-color);

    .search {
      background-color: #fff;
      padding: 30px;
    }

    label {
      color: $global-color;
      font-size: $font-size-medium;
    }

    input[type=text] {
      font-size: $font-size-medium;
      width: 100%;
      margin: 20px 0 0 0;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid $global-color;
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

        img.image {
          height: 12px;
        }

        span.item-name {
          margin-left: 10px;
        }
      }

      li.is-active,
      li.autocomplete-items:hover {
        background-color: $global-color;
      }
    }
  }

  .mobile {
    width: 50vw;
    margin: auto;
    padding: 15px;
    background-color: #fff;

    select {
      width: 100%;
      background-color: #fff;
      padding: 5px;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid $global-color;
      outline: none;
    }
  }
}

.emit-value {
  @include centerer;
  font-size: 10vw;
  color: $global-color;
}

</style>
