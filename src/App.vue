<template>
  <div id="app">
    <AutocompleteComponent class="autocomplete-component"/>
  </div>
</template>

<script>
import AutocompleteComponent from './components/AutocompleteComponent.vue'

export default {
  name: 'app',
  components: {
    AutocompleteComponent
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
  margin: 0 auto;
}

body {
  background-color: $background-color;
}
</style>
