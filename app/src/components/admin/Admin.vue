<template>
  <v-app id="admin">
    <Drawer />
    <Header />
    <v-content :class="['pa-3', 'dashboard-main', isLogin]">
      <v-container fluid class="pa-0">
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
  computed: {
    isLogin: function () {
      return this.$route.path.indexOf('login') >= 0 ? 'login-page' : '';
    }
  },
  mounted () {
    if (this.$route.path.indexOf('login') >= 0) this.$root.$emit('drawer', false);
  }
};
</script>

<style lang="scss" scoped>
.dashboard-main {
  max-width: 960px;
  margin: auto;
  width: 100%;
  &.login-page /deep/ .content--wrap {
    display: flex;
  }
}
#admin /deep/ .application--wrap {
  min-height: calc(100vh - 64px);
}
</style>