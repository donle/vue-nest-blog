<template>
  <div id="home">
    <div class="main-body mt-3">
      <v-layout>
        <v-flex xs12 sm7 class="pa-2">
          <ArticleScrollList />
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
import ArticleScrollList from "./ArticleScrollList";
import Instagram from '../shares/Instagram';
import RecentPost from '../shares/RecentPost';

export default {
  components: { AboutMe, ArticleScrollList, Instagram, RecentPost },
  name: 'Home'
};
</script>

<style lang="scss" scoped>
</style>
