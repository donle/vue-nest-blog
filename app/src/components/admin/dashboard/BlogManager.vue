<template>
<div class="text-xs-center">
  <ArticleList :articles="articles" editMode />
  <v-btn fab bottom right dark fixed color="red accent-2" :to="{ path: 'subject', query: { type: 'blog', mode: 'create' }}">
    <v-icon dark class="add-btn-icon">add</v-icon>
  </v-btn>
</div>
</template>

<script>
import ArticleList from '../../shares/ArticleList.vue';
import { ArticlesService } from "../../../util/services/admin/articles.service";

export default {
  name: "Blog",
  components: { ArticleList },
  data: () => ({
    articles: [],
    httpService: new ArticlesService()
  }),
  created() {
    this.getArticleListByType();
  },
  methods: {
    getArticleListByType () {
      this.httpService.getArticleListByType('blog').then(res => {

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
  .add-btn-icon {
    display: flex;
  }
</style>