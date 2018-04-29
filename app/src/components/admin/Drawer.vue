<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    v-model="drawer"
    class="drawer"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="item.heading"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="gotoPage(child.route)"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="gotoPage(item.route)" :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  data () {
    return {
      drawer: true,
      items: [
        { icon: "account_box", text: "个人信息", route: 'account' },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "文章列表",
          children: [
            { icon: "chrome_reader_mode", text: "文章", route: 'blog-list' },
            { icon: "send", text: "游记", route: 'travel-list' }
          ]
        },
        { icon: "camera_alt", text: "摄影", route: 'photo-list' },
        { icon: "audiotrack", text: "音乐", route: 'music-list' },
        { icon: "theaters", text: "Vlog", route: 'vlog-list' }
      ]
    };
  },
  methods: {
    gotoPage: function (route) {
      this.$router.push({ path: route });
    }
  },
  created() {},
  mounted () {
    this.$root.$on('drawer', openOrClose => this.drawer = openOrClose);
  }
};
</script>

<style lang="scss" scoped>
.drawer /deep/ {
  .list__group:before {
    left: 0;
    top: 0;
  }
  .list__group:after {
    left: 0;
  }
}
</style>