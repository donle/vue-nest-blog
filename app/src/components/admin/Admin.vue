<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
      </v-list>
    </v-navigation-drawer>
    <Header />
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { Header } from './Header';
import { Footer } from './Footer';
export default {
  name: 'Admin',
  components: { Header, Footer },
  data () {
    return {
      drawer: true
    }
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>

</style>