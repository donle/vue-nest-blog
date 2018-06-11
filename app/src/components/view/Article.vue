<template>
<div class="my-3 px-2">
  <v-layout row wrap class="layout row mb-3">
    <v-flex xs12 sm8 class="mt-3 px-3 elevation-1" style="background: white">
      <v-layout row :style="{ 'align-items': 'center' }" class="my-3">
        <h3 class="title" v-html="article ? article.title : ''"></h3>
        <v-spacer></v-spacer>
        <span v-html="article ? formatDate(article.creationDate) : ''" class="ext-title"></span>
      </v-layout>
      <div class='quill-editor ql-editor pa-1' v-html="article ? article.body : ''"></div>
    </v-flex>
    <v-flex sm4 class="px-2" style="position: relative">
      <RecentPost class="recent-post"/>
    </v-flex>
  </v-layout>
  <v-layout row class="mt-4 text-xs-left">
    <v-flex sm8 xs12>
      <Comments :comments="article ? article.comments : []" />
      </v-flex>
  </v-layout>
</div>
</template>

<script>
import { ArticlesService } from "../../util/services/admin/articles.service";
import moment from "moment";

import RecentPost from '../shares/RecentPost';
import Comments from './Comments';

export default {
  name: "Article",
  components: { RecentPost, Comments },
  data: () => ({
    httpService: new ArticlesService(),
    type: "",
    articleId: "",
    article: null
  }),
  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    pinEvent() {
      const recentPost = document.getElementsByClassName('recent-post')[0];
      if (window.pageYOffset > 139) recentPost.style.top = (window.pageYOffset - 139) + 'px';
      else  recentPost.style.top = Math.max(window.pageYOffset - 139, 0) + 'px';
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.articleId = this.$route.query.articleId;

    if (!(this.type && this.articleId)) this.$router.push("/home");
    else {
      this.httpService
        .getArticleById(this.articleId)
        .then(article => (this.article = article))
        .catch(err => {
          //@@todo
        });
    }

    document.addEventListener('scroll', this.pinEvent);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.pinEvent);
  }
};
</script>

<style lang="scss" scoped>
.ext-title {
  color: rgb(182, 182, 182) !important;
  font-style: italic;
}
.quill-editor {
  text-align: left;
  /deep/ img {
    max-width: 100%;
  }
}
.title {
  font-weight: bold;
}
.recent-post {
  width: 100%;
  position: absolute;
}
</style>