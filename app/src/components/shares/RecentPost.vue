<template>
  <div class="recentpost-card elevation-1 pt-2 mt-3">
    <h3 class="card-title ma-0 pt-1 pb-2 pl-3 pr-3">最新文章</h3>
    <div class="links">
      <span class="article-link pa-3" v-for="(article, index) in list" :key="index">
        <!-- <router-link class="red--text text--accent-2" :to="{ path: '/article', query: {id: article.articleId }}">{{ article.title }}</router-link> -->
        <a :href="`/article?type=${article.category}&articleId=${article.articleId}`" class="red--text text--accent-2">{{ article.title }}</a>
        
        <v-layout row wrap class="pt-1">
          <v-spacer></v-spacer>
          <span class="subtitle">{{ article.translatedCategory + ' - ' + article.subCategory + ' - ' + formatDate(article.creationDate)}} </span>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ArticlesService } from '@/util/services/admin/articles.service';

export default {
  name: "RecentPost",
  data: () => ({
    articleService: new ArticlesService(),
    list: []
  }),
  created() {
    const categoryNameMap = {
      'blog': '文章',
      'travel': '游记',
      'music': '音乐',
      'photo': '摄影'
    }

    this.articleService.getArticleListByType().then(articles => {
      this.list = articles.map(article => {
        return { ...article, translatedCategory: categoryNameMap[article.category]};
      });
    });
  },
  methods: {
    formatDate: function(date) {
      return moment(date).format("MMM DD, YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
.recentpost-card {
  background: #fff;
}
.card-title {
  border-bottom: 1px solid rgb(223, 223, 223);
  height: 48px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.links {
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
}
</style>

