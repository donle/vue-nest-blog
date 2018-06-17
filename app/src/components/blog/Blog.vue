<template>
  <div id="blog">
      <v-layout>
        <v-flex sm7 xs12 class="articles pa-2">
          <ArticleList :articles="articles" />
        </v-flex>
        <v-flex sm5 hidden-xs-only class="pa-2">
          <RecentPost />
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import ArticleList from "../shares/ArticleList";
import RecentPost from "../shares/RecentPost";
import { ArticlesService } from "@/util/services/admin/articles.service";

export default {
  name: "Blog",
  components: { ArticleList, RecentPost },
  data: () => ({
    articles: [],
    articleService: new ArticlesService()
  }),
  created() {
    this.getArticleListByType();
  },
  methods: {
    getArticleListByType () {
      this.articleService.getArticleListByType('blog').then(res => {

        for (let article of res) {
          let index = this.articles.findIndex(sub_articles => sub_articles.find(_article => _article.subCategory === article.subCategory));
          if (index >= 0) {
            this.articles[index].push(article);
          } else {
            this.articles.push([ article ]);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>