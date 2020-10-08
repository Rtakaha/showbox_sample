<template>
  <div id="app">
  <v-app>
    <Toolbar />
    <TableWrapper />
  </v-app>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import TableWrapper from './components/TableWrapper.vue'

export default {
  name: 'Home',
  components: {
    Toolbar,
    TableWrapper,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>