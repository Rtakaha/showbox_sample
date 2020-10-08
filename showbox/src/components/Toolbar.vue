<template>
  <v-card
    flat
    height="48px"
    tile
  >
    <v-toolbar class="white--text" dense flat color="#0D3B66">
      <v-spacer></v-spacer>
      <v-toolbar-title>Show box</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link class="white--text text-right mr-4 mt-1" to="/"><v-icon dark size=30>mdi-home</v-icon></router-link>
      <router-link class="white--text text-right" to="/logs" ><v-icon dark >mdi-file-chart</v-icon></router-link>
    </v-toolbar>
  </v-card>
</template>

<style>
.v-toolbar__content {
  padding-left: 100px !important;
}
a {
  text-decoration: none;
}
</style>
