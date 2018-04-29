<template>
  <v-parallax class="banner" :src="bannerImage" height="600" v-if="showBanner">
    <div class="intro pa-5">
      <p>{{ introduction }}</p>
    </div>
  </v-parallax>
</template>

<script>
export default {
  name: "Banner",
  props: {
    display: Boolean
  },
  computed: {
    showBanner: function () {
      return this.display;
    }
  },
  data() {
    return {
      introduction: "",
      bannerImage: require("@/assets/media/banners/home-banner.jpg")
    };
  },
  methods: {
  },
  created() {
    this.introduction = "想说的话";
  },
  mounted() {
    this.$root.$on('routerChanged', path => {
      path = require("@/assets/media/banners/blog-banner.jpg");
      this.bannerImage = path;
    });
  }
};
</script>

<style lang="scss" scoped>
.banner {
  max-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .parallax__content {
    max-width: 768px;
    width: 100%;
  }
  .intro {
    background: rgba(218, 218, 218, 0.6);
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    p {
      text-align: center;
      font-weight: 600;
      color: rgb(82, 82, 82);
    }
  }
}
</style>

