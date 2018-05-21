<template>
  <div class="recentpost-card elevation-1 pt-2 mt-3">
    <h3 class="card-title ma-0 pt-1 pb-2 pl-3 pr-3">最新文章</h3>
    <div class="links">
      <span class="article-link pa-3" v-for="(article, index) in list" :key="index">
        <!-- <router-link class="red--text text--accent-2" :to="{ path: '/article', query: {id: article.articleId }}">{{ article.title }}</router-link> -->
        <a class="red--text text--accent-2" :href="'/article/id?=' + article.articleId">{{ article.title }}</a>
        
        <v-layout row wrap class="pt-1">
          <v-spacer></v-spacer>
          <span class="subtitle">{{ article.category + ' - ' + article.subCategory + ' - ' + formatDate(article.creationDate)}} </span>
        </v-layout>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "RecentPost",
  data() {
    return {
      list: [
        {
          title: "畢業了，然後呢? Part 3 自薦信和面試技巧一把抓 (完)",
          creationDate: new Date("2018-03-01T14:05:20.293Z"),
          category: "文章",
          subCategory: "面试",
          articleId: 10001
        },
        {
          title: "畢業了，然後呢? Part 3 自薦信和面試技巧一把抓 (完)",
          creationDate: new Date("2018-03-01T14:05:20.293Z"),
          category: "文章",
          subCategory: "面试",
          articleId: 10001
        },
        {
          title: "畢業了，然後呢? Part 3 自薦信和面試技巧一把抓 (完)",
          creationDate: new Date("2018-03-01T14:05:20.293Z"),
          category: "文章",
          subCategory: "面试",
          articleId: 10001
        },
        {
          title: "畢業了，然後呢? Part 3 自薦信和面試技巧一把抓 (完)",
          creationDate: new Date("2018-03-01T14:05:20.293Z"),
          category: "文章",
          subCategory: "面试",
          articleId: 10001
        },
        {
          title: "畢業了，然後呢? Part 3 自薦信和面試技巧一把抓 (完)",
          creationDate: new Date("2018-03-01T14:05:20.293Z"),
          category: "文章",
          subCategory: "面试",
          articleId: 10001
        }
      ]
    };
  },
  created() {
    // this.$http
    //   .get("/api/articles/recent")
    //   .then(res => res.data)
    //   .then(data => {
    //     this.list = data;
    //     console.log(data);
    //   });
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

