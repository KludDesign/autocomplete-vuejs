<template>
  <div id="app">
    <AutocompleteComponent />
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
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: $background-color;
}
</style>
