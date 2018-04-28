<template>
  <div id="article-list">
    <div class="article-list-card elevation-1 pt-2 mt-3" v-for="(sub_articles, index) in articles" :key="index">
      <h3 class="card-title ma-0 pt-1 pb-2 pl-3 pr-3">{{ sub_articles[0].subCategory }}</h3>
      <v-layout row wrap class="links" v-for="(article, sub_index) in sub_articles" :key="sub_index">
        <v-flex xs12 class="article-link pa-3">
          <v-layout row wrap>
            <a class="red--text text--accent-2" :href="'/article/id?=' + article.articleId">{{ article.title }}</a>
            <v-spacer></v-spacer>
            <span class="subtitle">{{formatDate(article.creationDate)}} </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ArticleList",
  props: {
    articles: Array
  },
  created() {},
  methods: {
    formatDate: function(date) {
      return moment(date).format("MMM DD, YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
.article-list-card {
  background: #f8f8f8;
}
.card-title {
  border-bottom: 1px solid rgb(223, 223, 223);
  height: 48px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.article-link {
  width: 100%;
  display: block;
  border-bottom: 1px solid rgb(223, 223, 223);
  text-align: left;
  a {
    text-decoration: none;
  }
  &:hover {
    a {
      color: rgb(182, 182, 182) !important;
    }
  }
}
.subtitle {
  display: flex;
  font-size: 12px;
  font-weight: 500;
  color: #b6b6b6;
}
</style>