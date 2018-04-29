<template>
  <v-toolbar id="header"
    color="blue darken-3"
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

    <v-btn icon>
      <v-badge right overlap color="red">
        <span slot="badge">6</span>
        <v-icon>notifications</v-icon>
      </v-badge>
    </v-btn>
    <v-btn icon class="mr-3">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    openCloseDrawer: function () {
      this.drawer = !this.drawer;
      this.$root.$emit('drawer', this.drawer);
    }
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>
</style>