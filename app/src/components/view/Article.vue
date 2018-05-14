<template>
<v-layout row wrap class="my-3">
  <v-flex xs12 sm8 class="mt-3 px-2">
    <v-layout row :style="{ 'align-items': 'center' }" class="mb-4">
      <h3 class="title" v-html="article ? article.title : ''"></h3>
      <v-spacer></v-spacer>
      <span v-html="article ? formatDate(article.creationDate) : ''" class="ext-title"></span>
    </v-layout>
    <div class='quill-editor ql-editor' v-html="article ? article.body : ''"></div>
  </v-flex>
  <v-flex sm4 class="px-2">
    <RecentPost />
  </v-flex>
</v-layout>
</template>

<script>
import { ArticlesService } from "../../util/services/admin/articles.service";
import moment from "moment";

import RecentPost from '../shares/RecentPost';

export default {
  name: "Article",
  components: { RecentPost },
  data: () => ({
    httpService: new ArticlesService(),
    type: "",
    articleId: "",
    article: null
  }),
  methods: {
    formatDate(date) {
      return moment(date).format("MMM DD, YYYY");
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
</style>