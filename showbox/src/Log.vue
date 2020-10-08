<template>
  <div id="app">
  <v-app>
    <Toolbar />
    <TableLog />
  </v-app>
  </div>
</template>
<script>
import Toolbar from './components/Toolbar.vue'
import TableLog from './components/TableLog.vue'

export default {
  name: 'Log',
  components: {
    Toolbar,
    TableLog,
  },
}
</script>