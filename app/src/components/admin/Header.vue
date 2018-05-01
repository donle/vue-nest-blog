<template>
  <v-toolbar id="header"
    color="red accent-2"
    dark
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    fixed
  >
    <v-toolbar-title class="ml-0 pl-3 boolbar">
      <v-toolbar-side-icon @click.stop="openCloseDrawer()"></v-toolbar-side-icon>
      <span class="hidden-sm-and-down">Jen's Blog</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tooltip bottom v-if="!isLoginPage">
      <v-btn icon slot="activator">
        <v-badge right overlap color="amber darken-1">
          <span slot="badge">6</span>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
      <span>Notifications</span>
    </v-tooltip>
    <v-tooltip bottom v-if="!isLoginPage">
      <v-btn icon slot="activator" class="mr-3">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
      <span>Log out</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    drawer: true,
    isLoginPage: false
  }),
  methods: {
    openCloseDrawer: function () {
      if (this.isLoginPage) return;
      this.drawer = !this.drawer;
      this.$root.$emit('drawer', this.drawer);
    }
  },
  created () {
    if (this.$route.path.indexOf('login') >= 0) this.isLoginPage = true;
    this.drawer = !this.isLoginPage;
  }
};
</script>

<style lang="scss" scoped>
</style>