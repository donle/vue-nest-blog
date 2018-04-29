<template>
  <v-app id="admin">
    <Drawer />
    <Header />
    <v-content class="pa-3 dashboard-main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Drawer from "./Drawer";

export default {
  name: "Admin",
  components: { Header, Footer, Drawer },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.dashboard-main {
  max-width: 960px;
  margin: auto;
  width: 100%;
}
</style>