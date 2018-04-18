<template>
  <div id="home">
    <Banner />
    <div class="main-body mt-3">
      <v-layout>
        <v-flex xs12 sm7 class="pa-2">
          <ArticleList />
        </v-flex>
        <v-flex sm5 hidden-xs-only class="pa-2">
          <AboutMe />
          <!-- <Instagram /> -->
          <RecentPost />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import AboutMe from "./AboutMe";
import ArticleList from "./ArticleList";
import Banner from './Banner';
import Instagram from '../shares/Instagram';
import RecentPost from '../shares/RecentPost';

export default {
  components: { Banner, AboutMe, ArticleList, Instagram, RecentPost },
  name: 'Home'
};
</script>

<style lang="scss" scoped>
#home {
  background: #eee;
}
  .main-body {
    max-width: 860px;
    width: 100%;
    margin: auto;
  }
</style>
