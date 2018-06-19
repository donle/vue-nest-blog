<template>
  <div class="article-list">
    <div class="article-card pt-2 pb-3 mt-3 mb-3 elevation-1" v-for="(article, index) in articles" :key="index">
      <h3 class="card-title ma-0 pl-3 pr-3 pb-2">
        <span>{{article.title + ' - ' + article.subCategory}}</span>
        <v-spacer></v-spacer>
        <span class="sub-card-title"> {{ formatDate(article.date) }} </span>
      </h3>
      <div class="card-body pl-3 pr-3 pt-3">
        <span v-if="article.snapshotUrl" class="card-body-media">
          <img :src="article.snapshotUrl" />
        </span>
        <v-layout class="card-body-context ma-0 pl-2" row wrap> 
          <v-flex xs12 class="snapshot">
            {{ getShortBody(article.body) }} 
          </v-flex>
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-btn flat class="red--text text--accent-2 read-more" :to="{path: 'article', query: {
              type: article.category,
              articleId: article.articleId
            }}">阅读全文</v-btn>
          </v-layout>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ArticlesService } from "@/util/services/admin/articles.service";

export default {
  name: "ArticleScrollList",
  data: () => ({
    articles: [],
    articleService: new ArticlesService()
  }),
  computed: {},
  methods: {
    formatDate: function(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    getImgUrl(pet) {
      return require(pet);
    },
    getShortBody: function(body) {
      return body.length > 120 ? body.substring(0, 120) + "..." : body;
    }
  },
  created() {
    this.articleService
      .getArticleListByType()
      .then(articles => {
        this.articles = articles.map(article => ({
          articleId: article.articleId,
          body: article.body.replace(/<.+?>/g, ""),
          category: article.category,
          subCategory: article.subCategory,
          title: article.title,
          date: article.creationDate,
          snapshotUrl:
            article.media.length === 0
              ? ""
              : article.media[0].replace(/dist\//, "")
        }));
      })
      .catch(error => {
        //@todo: catch error
      });
  }
};
</script>

<style lang="scss" scoped>
.article-card {
  background: #fff;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  border-bottom: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  height: 48px;
  span {
    display: flex;
    align-items: center;
  }
  .sub-card-title {
    font-size: 12px;
    font-weight: 500;
    color: rgb(182, 182, 182);
  }
}
.card-body {
  max-height: 228px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .card-body-media {
    flex: 0 0 25%;
    height: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .card-body-context {
    .snapshot {
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
    }
    .read-more {
      font-weight: 600;
    }
    // white-space: nowrap;
  }
}
</style>

