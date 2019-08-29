<template>
  <div id="app">
    <AutocompletionComponent />
  </div>
</template>

<script>
import AutocompletionComponent from './components/AutocompletionComponent.vue'

export default {
  name: 'app',
  components: {
    AutocompletionComponent
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
  margin-top: 60px;
}
</style>
